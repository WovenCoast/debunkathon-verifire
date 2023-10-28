from flask import Flask, request
from langdetect import detect
from fuzzywuzzy import fuzz
import json
import re

import sys
sys.path.append('../')

threshold = 400

from backend import translate, nlp

app = Flask(__name__)
data = []

# Open the TSV file and import all the data
with open('data-processed.tsv', 'r', encoding="utf-8") as file:
  file_contents = file.read()
  lines = file_contents.split('\n')
  # ignore the first line
  lines = lines[1:]

  # parse out the data
  for line in lines:
    if line != '':
      line = line.split('\t')
      data.append(line)

@app.route('/query', methods=['POST'])
def query():
    if (request.is_json == False):
        return 'Error: Request must be JSON'
    # text_data = request.form['text']
    text_data = request.get_json().get('text')

    # convert to english if text is not already in dv
    if (re.search('[a-zA-Z]', text_data) == None):
        text_data = translate.magic_translate(text_data, "en").text

    # extract the noun phrases
    noun_phrases = nlp.get_noun_phrases(text_data)

    # extract the verbs
    verbs = nlp.get_verbs(text_data)

    # extract the named entities
    named_entities = nlp.get_named_entities(text_data)

    # fuzz.ratio("this is a test", "this is a test!")
    highest_score = 0
    sorted_data = []
    for line in data:
        # calculate the score
        score = 0
        # title
        score += fuzz.ratio(text_data, line[3])
        # # text
        # score += fuzz.ratio(text_data, line[4])
        # commented out because the raw text doesn't need to match the data
        # noun phrases
        if (len(line) > 5 and line[5] != ''):
            for phrase in noun_phrases:
                score += fuzz.ratio(phrase, line[5])
        # verbs
        if (len(line) > 6 and line[6] != ''):
            for verb in verbs:
                score += fuzz.ratio(verb, line[6])
        # named entities
        if (len(line) > 7 and line[7] != ''):
            for entity in named_entities:
                score += fuzz.ratio(entity[0], line[7])

        sorted_data.append((line, score))
        print(score)
        if (score > highest_score):
            highest_score = score

    # sort the data
    sorted_data = sorted(sorted_data, key=lambda x: x[1], reverse=True)

    is_fake = highest_score > threshold

    # return the top 10 results
    return json.dumps({"confidence": highest_score, "fact": is_fake, "articles": sorted_data[0:10]})

if __name__ == '__main__':
    app.run(debug=True,port=5000)
# load in csv data
import sys


sys.path.append('../')

from backend import translate as gt
from backend import nlp

with open('data.tsv', 'r', encoding="utf-8") as file:
  file_contents = file.read()
  lines = file_contents.split('\n')
  # ignore the first line
  # lines = lines[1:]

  # parse out the data
  data = []
  for line in lines:
    if line != '':
      line = line.split('\t')
      data.append(line)

  # for line in data:
  #   # translate the text
  #   if (line[1] == ''):
  #     line.append("")
  #   else:
  #     try:
  #       titleTranslate = gt.translate(line[1], 'dv', 'en')
  #       line.append(titleTranslate.text)
  #     except:
  #       line.append("")
  #   # translate the text
  #   if (line[2] == ''):
  #     line.append("")
  #   else:
  #     # try: 
  #       texts = [line[2][i:i+3000] for i in range(0, len(line[2]), 3000)]
  #       # textTranslate = gt.translate(line[2][0:3000], 'dv', 'en')
  #       textsTranslate = []
  #       for text in texts:
  #         textTranslation = gt.translate(text, 'dv', 'en')
  #         textsTranslate.append(textTranslation.text)
  #       textTranslate = ' '.join(textsTranslate)
  #       line.append(textTranslate)
  #     # except:
  #     #   line.append("")

  for line in data:
    if (line[4] == ''):
      line.append("")
    else:
      noun_phrases = nlp.get_noun_phrases(line[4])
      line.append(','.join(list(set(noun_phrases))))
      verbs = nlp.get_verbs(line[4])
      line.append(','.join(list(set(verbs))))
      named_entities = nlp.get_named_entities(line[4])
      line.append(','.join(list(set([entity[0] for entity in named_entities if entity[1] == 'PERSON']))))

  # write the data back to the file
  with open('data-processed.tsv', 'w', encoding="utf-8") as file:
    # file.write('id\ttext\n')
    for line in data:
      file.write('\t'.join(line) + '\n')



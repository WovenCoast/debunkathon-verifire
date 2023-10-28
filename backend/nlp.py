import spacy

# Load English tokenizer, tagger, parser and NER
nlp = spacy.load("en_core_web_sm")


# # Process whole documents
# text = ("Updated Google sheet w/ links to MV podcasts. Please drop a DM if you start one or know of any I've missed here")
# doc = nlp(text)

# # Analyze syntax
# print("Noun phrases:", [chunk.text for chunk in doc.noun_chunks])
# print("Verbs:", [token.lemma_ for token in doc if token.pos_ == "VERB"])

# # Find named entities, phrases and concepts
# for entity in doc.ents:
#     print(entity.text, entity.label_)

def get_noun_phrases(text):
    doc = nlp(text)
    return [chunk.text for chunk in doc.noun_chunks]

def get_verbs(text):
    doc = nlp(text)
    return [token.lemma_ for token in doc if token.pos_ == "VERB"]

def get_named_entities(text):
    doc = nlp(text)
    return [(entity.text, entity.label_) for entity in doc.ents]


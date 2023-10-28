from googletrans import Translator

translator = Translator()

def magic_translate(text, dest):
  return translator.translate(text, dest=dest)

def translate(text, src, dest):
  return translator.translate(text, src=src, dest=dest)

# if __main__ == '__name__':
#   result = translator.translate('މިއަދު ހިނގާ ސައި ބޯން', src='dv', dest='en')
#   # if this doesn't work, add this line to the languages dictionary in constants.py:
#   # 'dv': 'dhivehi',

#   print(result)

# result = magic_translate("މިއަދު ހިނގާ ސައި ބޯން", "en")
# print(result)
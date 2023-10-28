**Goal**: make a chrome extension that checks tweets wether they are factual or not, compared to the known news sources

### Steps to complete:

- [x] get tweet data from user (through chrome extension)
- [x] get the tweet into the system
- [x] translate the tweet to english if its in dhivehi
- [x] find news articles based on the keywords on the twitter status
- [x] translate the articles to english if its in dhivehi
- [x] compare tweets to the article (lookup) and check if its factual
- [ ] show graphically that the tweet is factual or not. need to show if "no match was found"
- [x] show the articles being used

### The flow

1. user clicks on the extension
2. extension gets the tweet data
3. extension sends the tweet data to the server
4. server translates the tweet to english if its in dhivehi
5. server finds news articles based on the keywords on the twitter status
6. server translates the articles to english if its in dhivehi
7. server compares tweets to the article (lookup) and check if its factual
8. server sends the result to the extension
9. extension shows graphically that the tweet is factual or not. need to show if "no match was found"
10. extension shows the articles being used

title: Shakespeare API
baseUri: {host}/api/{version}
version: v0.1

/annotations:
  get:
    queryParameters:
      paragraph_id:
      user_id:
      locale:
      lineStart:
      lineEnd:
    description: Retrieves all annotations matching a query
  post:
    queryParameters:
      authorization:
      paragraph_id:
      user_id:
      locale:
      lineStart:
      lineEnd:
      plainText:
    description: Creates a new annotation
  /{id}:
    get:
      description: Retrieves a specific annotation
    put:
      queryParameters:
        authorization:
        paragraph_id:
        user_id:
        locale:
        lineStart:
        lineEnd:
        plainText:
      description: Updates a specific annotation
    delete:
      queryParameters:
        authorization:
      description: Deletes a specific annotation

/chapters
  get:
    queryParameters:
      act:
      scene:
      work_id:
    description: Retrieves all chapters matching a query

  /{id}:
    get:
      description: Retrieves a specific chapter
    (put:)
      queryParameters:
        authorization:
      description: Updates a chapter

/characters
  get:
    queryParameters:
      charName:
      abbrev:
    description: Retrieves all characters matching a query

  /{id}:
    get:
      description: Retrieves a specific character
    (put:)
      queryParameters:
        authorization:
      description: Updates a character

/paragraphs
  get:
    queryParameters:
      videoIn
      videoOut
      character_id
      chapter_id

  /{id}:
    get:
    (put:)

/users
  get:
  post:
  put:
  delete:

/works
  get:
  (put:)



QUESTIONS
- Private application-only routes?
- Version control?

export class Constants {
  bookies = {
    "Bookies Version": "0.0.1",
    "Bookmarks": [
      {
        "Type": "Bookmark",
        "Id": 0,
        "Title": "Title of the Bookmark, has ID 0",
        "URL": "https://vg.no",
        "Tags": ["News", "Norwegian News", "Demo Website"]
      },
      {
        "Type": "Folder",
        "Id": 1,
        "Title": "Some Folder Name Here",
        "Bookmarks":
        [
          {
            "Type": "Bookmark",
            "Id": 2,
            "Title": "Has Id 1, bit short",
            "URL": "https://wikipedia.com",
            "Tags": ["Information", "Info"]
          },
          {
            "Type": "Bookmark",
            "Id": 3,
            "Title": "Has Id 2",
            "URL": "https://alnyk.pages.dev",
            "Tags": ["Personal", "Portfolio", "Personal Project"]
          },
          {
            "Type": 'Folder',
            "Id": 4,
            "Title": 'Some Folder Name Here',
            "Bookmarks":
              [
                {
                  "Type": 'Bookmark',
                  "Id": 5,
                  "Title": 'Has Id 2',
                  "URL": 'https://alnyk.pages.dev',
                  "Tags": [ 'Personal', 'Portfolio', 'Personal Project' ]
                },
              ]
          },
          {
            "Type": 'Bookmark',
            "Id": 6,
            "Title": 'Has Id 1, bit short',
            "URL": 'https://wikipedia.com',
            "Tags": [ 'Information', 'Info' ]
          }
        ]
      }
    ]
  };

  flatBookies = [
    {
      Type: "Bookmark",
      Id: 0,
      Title: "Title of the Bookmark, has ID 0",
      URL: "https://vg.no",
      Tags: ["News", "Norwegian News", "Demo Website"]
    },
    {
      Type: "Folder",
      Id: 1,
      Title: "Some Folder Name Here",
      Children: [2, 3, 4, 6]
    },
    {
      Type: "Bookmark",
      Id: 2,
      Title: "Has Id 1, bit short",
      URL: "https://wikipedia.com",
      Tags: ["Information", "Info"]
    },
    {
      Type: "Bookmark",
      Id: 3,
      Title: "Has Id 2",
      URL: "https://alnyk.pages.dev",
      Tags: ["Personal", "Portfolio", "Personal Project"]
    },
    {
      Type: 'Folder',
      Id: 4,
      Title: 'Some Folder Name Here',
      Children: [5]
    },
    {
      Type: 'Bookmark',
      Id: 5,
      Title: 'Has Id 2',
      URL: 'https://alnyk.pages.dev',
      Tags: [ 'Personal', 'Portfolio', 'Personal Project' ]
    },
    {
      Type: 'Bookmark',
      Id: 6,
      Title: 'Has Id 1, bit short',
      URL: 'https://wikipedia.com',
      Tags: [ 'Information', 'Info' ]
    }
  ];

  flatBookiesMovedItem = [
    {
      Type: "Bookmark",
      Id: 0,
      Title: "Title of the Bookmark, has ID 0",
      URL: "https://vg.no",
      Tags: ["News", "Norwegian News", "Demo Website"]
    },
    {
      Type: "Folder",
      Id: 1,
      Title: "Some Folder Name Here",
      Children: [2, 4, 6]
    },
    {
      Type: "Bookmark",
      Id: 2,
      Title: "Has Id 1, bit short",
      URL: "https://wikipedia.com",
      Tags: ["Information", "Info"]
    },
    {
      Type: "Bookmark",
      Id: 3,
      Title: "Has Id 2",
      URL: "https://alnyk.pages.dev",
      Tags: ["Personal", "Portfolio", "Personal Project"]
    },
    {
      Type: 'Folder',
      Id: 4,
      Title: 'Some Folder Name Here',
      Children: [5, 3]
    },
    {
      Type: 'Bookmark',
      Id: 5,
      Title: 'Has Id 2',
      URL: 'https://alnyk.pages.dev',
      Tags: [ 'Personal', 'Portfolio', 'Personal Project' ]
    },
    {
      Type: 'Bookmark',
      Id: 6,
      Title: 'Has Id 1, bit short',
      URL: 'https://wikipedia.com',
      Tags: [ 'Information', 'Info' ]
    }
  ];

  bookiesMovedItem = {
    "Bookies Version": "0.0.1",
    "Bookmarks": [
      {
        "Type": "Bookmark",
        "Id": 0,
        "Title": "Title of the Bookmark, has ID 0",
        "URL": "https://vg.no",
        "Tags": ["News", "Norwegian News", "Demo Website"]
      },
      {
        "Type": "Folder",
        "Id": 1,
        "Title": "Some Folder Name Here",
        "Bookmarks":
        [
          {
            "Type": "Bookmark",
            "Id": 2,
            "Title": "Has Id 1, bit short",
            "URL": "https://wikipedia.com",
            "Tags": ["Information", "Info"]
          },
          {
            "Type": 'Folder',
            "Id": 4,
            "Title": 'Some Folder Name Here',
            "Bookmarks":
              [
                {
                  "Type": 'Bookmark',
                  "Id": 5,
                  "Title": 'Has Id 2',
                  "URL": 'https://alnyk.pages.dev',
                  "Tags": [ 'Personal', 'Portfolio', 'Personal Project' ]
                },
                {
                  "Type": "Bookmark",
                  "Id": 3,
                  "Title": "Has Id 2",
                  "URL": "https://alnyk.pages.dev",
                  "Tags": ["Personal", "Portfolio", "Personal Project"]
                }
              ]
          },
          {
            "Type": 'Bookmark',
            "Id": 6,
            "Title": 'Has Id 1, bit short',
            "URL": 'https://wikipedia.com',
            "Tags": [ 'Information', 'Info' ]
          }
        ]
      }
    ]
  };
}

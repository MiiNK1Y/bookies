export class Constants {
  flatParent = {
    Type: 'Folder',
    Id: 1,
    Title: 'Some Folder Name Here',
    Children: [ 2, 3, 4, 6]
  };

  flatChildren = [
    {
      Type: 'Bookmark',
      Id: 2,
      Title: 'Has Id 1, bit short',
      URL: 'https://wikipedia.com',
      Tags: [ 'Information', 'Info' ]
    },
    {
      Type: 'Bookmark',
      Id: 3,
      Title: 'Has Id 2',
      URL: 'https://alnyk.pages.dev',
      Tags: [ 'Personal', 'Portfolio', 'Personal Project' ]
    },
    {
      Type: 'Folder',
      Id: 4,
      Title: 'Some Folder Name Here',
      Children: [ 5 ]
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
    },
  ];

  flatChildrenScrambled = [
    {
      Type: 'Bookmark',
      Id: 5,
      Title: 'Has Id 2',
      URL: 'https://alnyk.pages.dev',
      Tags: [ 'Personal', 'Portfolio', 'Personal Project' ]
    },
    {
      Type: 'Folder',
      Id: 4,
      Title: 'Some Folder Name Here',
      Children: [ 5 ]
    },
    {
      Type: 'Bookmark',
      Id: 6,
      Title: 'Has Id 1, bit short',
      URL: 'https://wikipedia.com',
      Tags: [ 'Information', 'Info' ]
    },
    {
      Type: 'Bookmark',
      Id: 3,
      Title: 'Has Id 2',
      URL: 'https://alnyk.pages.dev',
      Tags: [ 'Personal', 'Portfolio', 'Personal Project' ]
    },
    {
      Type: 'Bookmark',
      Id: 2,
      Title: 'Has Id 1, bit short',
      URL: 'https://wikipedia.com',
      Tags: [ 'Information', 'Info' ]
    }
  ];

  flatParentInflated = {
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
  };

  flatChildrenMissingItem = [
    {
      Type: 'Bookmark',
      Id: 2,
      Title: 'Has Id 1, bit short',
      URL: 'https://wikipedia.com',
      Tags: [ 'Information', 'Info' ]
    },
    {
      Type: 'Bookmark',
      Id: 3,
      Title: 'Has Id 2',
      URL: 'https://alnyk.pages.dev',
      Tags: [ 'Personal', 'Portfolio', 'Personal Project' ]
    },
    {
      Type: 'Folder',
      Id: 4,
      Title: 'Some Folder Name Here',
      Children: [ 5 ]
    },
    {
      Type: 'Bookmark',
      Id: 5,
      Title: 'Has Id 2',
      URL: 'https://alnyk.pages.dev',
      Tags: [ 'Personal', 'Portfolio', 'Personal Project' ]
    },
  ];

  scrambledFlatBookies = [
    {
      Type: "Bookmark",
      Id: 0,
      Title: "Title of the Bookmark, has ID 0",
      URL: "https://vg.no",
      Tags: ["News", "Norwegian News", "Demo Website"]
    },
    {
      Type: "Bookmark",
      Id: 3,
      Title: "Has Id 2",
      URL: "https://alnyk.pages.dev",
      Tags: ["Personal", "Portfolio", "Personal Project"]
    },
    {
      Type: "Folder",
      Id: 1,
      Title: "Some Folder Name Here",
      Children: [2, 3]
    },
    {
      Type: "Bookmark",
      Id: 4,
      Title: "Title of the second Bookmark, very very very long, maybe fit an URL here?",
      URL: "https://vg.no",
      Tags: ["News", "Norwegian News", "Demo Website"]
    },
    {
      Type: "Bookmark",
      Id: 2,
      Title: "Has Id 1, bit short",
      URL: "https://wikipedia.com",
      Tags: ["Information", "Info"]
    }
  ];

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
      Children: [2, 3]
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
      Type: "Bookmark",
      Id: 4,
      Title: "Title of the second Bookmark, very very very long, maybe fit an URL here?",
      URL: "https://vg.no",
      Tags: ["News", "Norwegian News", "Demo Website"]
    }
  ];

  bookiesInflated = [
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
          }
        ]
    },
    {
      "Type": "Bookmark",
      "Id": 4,
      "Title": "Title of the second Bookmark, very very very long, maybe fit an URL here?",
      "URL": "https://vg.no",
      "Tags": ["News", "Norwegian News", "Demo Website"]
    }
  ];

  bigFlatBookies = [
    {
      Type: 'Bookmark',
      Id: 0,
      Title: 'Title of the Bookmark, has ID 0',
      URL: 'https://vg.no',
      Tags: [ 'News', 'Norwegian News', 'Demo Website' ]
    },
    {
      Type: 'Folder',
      Id: 1,
      Title: 'Some Folder Name Here',
      Children: [ 2, 3 ]
    },
    {
      Type: 'Bookmark',
      Id: 4,
      Title: 'Title of the second Bookmark, very very very long, maybe fit an URL here?',
      URL: 'https://vg.no',
      Tags: [ 'News', 'Norwegian News', 'Demo Website' ]
    },
    {
      Type: 'Folder',
      Id: 5,
      Title: 'Some New Folder Name Here, has ID 1',
      Children: [ 6, 7, 16 ]
    },
    {
      Type: 'Bookmark',
      Id: 17,
      Title: 'Title of the Bookmark, has ID 0',
      URL: 'https://vg.no',
      Tags: [ 'News', 'Norwegian News', 'Demo Website' ]
    },
    {
      Type: 'Folder',
      Id: 7,
      Title: 'Folder, has ID 2',
      Children: [ 8, 9, 10 ]
    },
    {
      Type: 'Folder',
      Id: 10,
      Title: 'Some Folder with ID 3',
      Children: [ 11, 12, 13 ]
    },
    {
      Type: 'Folder',
      Id: 13,
      Title: 'Folder with ID 4',
      Children: [ 14, 15 ]
    },
    {
      Type: 'Folder',
      Id: 18,
      Title: 'Some Folder Name Here',
      Children: [ 19, 20 ]
    },
    {
      Type: 'Bookmark',
      Id: 21,
      Title: 'Title of the second Bookmark, very very very long, maybe fit an URL here?',
      URL: 'https://vg.no',
      Tags: [ 'News', 'Norwegian News', 'Demo Website' ]
    },
    {
      Type: 'Folder',
      Id: 22,
      Title: 'Some New Folder Name Here, has ID 1',
      Children: [ 23, 24, 33 ]
    },
    {
      Type: 'Folder',
      Id: 24,
      Title: 'Folder, has ID 2',
      Children: [ 25, 26, 27 ]
    },
    {
      Type: 'Folder',
      Id: 27,
      Title: 'Some Folder with ID 3',
      Children: [ 28, 29, 30 ]
    },
    {
      Type: 'Folder',
      Id: 30,
      Title: 'Folder with ID 4',
      Children: [ 31, 32 ]
    },
    {
      Type: 'Bookmark',
      Id: 2,
      Title: 'Has Id 1, bit short',
      URL: 'https://wikipedia.com',
      Tags: [ 'Information', 'Info' ]
    },
    {
      Type: 'Bookmark',
      Id: 3,
      Title: 'Has Id 2',
      URL: 'https://alnyk.pages.dev',
      Tags: [ 'Personal', 'Portfolio', 'Personal Project' ]
    },
    {
      Type: 'Bookmark',
      Id: 6,
      Title: 'fdjskal;fgjkdsal;,, Has Id 4',
      URL: 'https://wikipedia.com',
      Tags: [ 'Information', 'Info' ]
    },
    {
      Type: 'Bookmark',
      Id: 8,
      Title: 'Has Id 5...',
      URL: 'https://wikipedia.com',
      Tags: [ 'Information', 'Info' ]
    },
    {
      Type: 'Bookmark',
      Id: 9,
      Title: 'Has Id 6, some more nesting inside here...',
      URL: 'https://alnyk.pages.dev',
      Tags: [ 'Personal', 'Portfolio', 'Personal Project' ]
    },
    {
      Type: 'Bookmark',
      Id: 11,
      Title: 'Title of the second Bookmark, very very very long, maybe fit an URL here?',
      URL: 'https://wikipedia.com',
      Tags: [ 'Information', 'Info' ]
    },
    {
      Type: 'Bookmark',
      Id: 12,
      Title: 'Has Id 8',
      URL: 'https://alnyk.pages.dev',
      Tags: [ 'Personal', 'Portfolio', 'Personal Project' ]
    },
    {
      Type: 'Bookmark',
      Id: 14,
      Title: 'Has Id 10',
      URL: 'https://wikipedia.com',
      Tags: [ 'Information', 'Info' ]
    },
    {
      Type: 'Bookmark',
      Id: 15,
      Title: 'Has Id 11, and some long title for some article perhaps.',
      URL: 'https://alnyk.pages.dev',
      Tags: [ 'Personal', 'Portfolio', 'Personal Project' ]
    },
    {
      Type: 'Bookmark',
      Id: 16,
      Title: 'Has Id 9, and is medium long',
      URL: 'https://alnyk.pages.dev',
      Tags: [ 'Personal', 'Portfolio', 'Personal Project' ]
    },
    {
      Type: 'Bookmark',
      Id: 19,
      Title: 'Has Id 1, bit short',
      URL: 'https://wikipedia.com',
      Tags: [ 'Information', 'Info' ]
    },
    {
      Type: 'Bookmark',
      Id: 20,
      Title: 'Has Id 2',
      URL: 'https://alnyk.pages.dev',
      Tags: [ 'Personal', 'Portfolio', 'Personal Project' ]
    },
    {
      Type: 'Bookmark',
      Id: 23,
      Title: 'fdjskal;fgjkdsal;,, Has Id 4',
      URL: 'https://wikipedia.com',
      Tags: [ 'Information', 'Info' ]
    },
    {
      Type: 'Bookmark',
      Id: 25,
      Title: 'Has Id 5...',
      URL: 'https://wikipedia.com',
      Tags: [ 'Information', 'Info' ]
    },
    {
      Type: 'Bookmark',
      Id: 26,
      Title: 'Has Id 6, some more nesting inside here...',
      URL: 'https://alnyk.pages.dev',
      Tags: [ 'Personal', 'Portfolio', 'Personal Project' ]
    },
    {
      Type: 'Bookmark',
      Id: 28,
      Title: 'Title of the second Bookmark, very very very long, maybe fit an URL here?',
      URL: 'https://wikipedia.com',
      Tags: [ 'Information', 'Info' ]
    },
    {
      Type: 'Bookmark',
      Id: 29,
      Title: 'Has Id 8',
      URL: 'https://alnyk.pages.dev',
      Tags: [ 'Personal', 'Portfolio', 'Personal Project' ]
    },
    {
      Type: 'Bookmark',
      Id: 31,
      Title: 'Has Id 10',
      URL: 'https://wikipedia.com',
      Tags: [ 'Information', 'Info' ]
    },
    {
      Type: 'Bookmark',
      Id: 32,
      Title: 'Has Id 11, and some long title for some article perhaps.',
      URL: 'https://alnyk.pages.dev',
      Tags: [ 'Personal', 'Portfolio', 'Personal Project' ]
    },
    {
      Type: 'Bookmark',
      Id: 33,
      Title: 'Has Id 9, and is medium long',
      URL: 'https://alnyk.pages.dev',
      Tags: [ 'Personal', 'Portfolio', 'Personal Project' ]
    }
  ];

  completeBookies = {
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
            }
          ]
      },
      {
        "Type": "Bookmark",
        "Id": 4,
        "Title": "Title of the second Bookmark, very very very long, maybe fit an URL here?",
        "URL": "https://vg.no",
        "Tags": ["News", "Norwegian News", "Demo Website"]
      }
    ]
  };

  bigBookiesInflated = [
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
          }
        ]
    },
    {
      "Type": "Bookmark",
      "Id": 4,
      "Title": "Title of the second Bookmark, very very very long, maybe fit an URL here?",
      "URL": "https://vg.no",
      "Tags": ["News", "Norwegian News", "Demo Website"]
    },
    {
      "Type": "Folder",
      "Id": 5,
      "Title": "Some New Folder Name Here, has ID 1",
      "Bookmarks":
        [
          {
            "Type": "Bookmark",
            "Id": 6,
            "Title": "fdjskal;fgjkdsal;,, Has Id 4",
            "URL": "https://wikipedia.com",
            "Tags": ["Information", "Info"]
          },
          {
            "Type": "Folder",
            "Id": 7,
            "Title": "Folder, has ID 2",
            "Bookmarks":
              [
                {
                  "Type": "Bookmark",
                  "Id": 8,
                  "Title": "Has Id 5...",
                  "URL": "https://wikipedia.com",
                  "Tags": ["Information", "Info"]
                },
                {
                  "Type": "Bookmark",
                  "Id": 9,
                  "Title": "Has Id 6, some more nesting inside here...",
                  "URL": "https://alnyk.pages.dev",
                  "Tags": ["Personal", "Portfolio", "Personal Project"]
                },
                {
                  "Type": "Folder",
                  "Id": 10,
                  "Title": "Some Folder with ID 3",
                  "Bookmarks":
                    [
                      {
                        "Type": "Bookmark",
                        "Id": 11,
                        "Title": "Title of the second Bookmark, very very very long, maybe fit an URL here?",
                        "URL": "https://wikipedia.com",
                        "Tags": ["Information", "Info"]
                      },
                      {
                        "Type": "Bookmark",
                        "Id": 12,
                        "Title": "Has Id 8",
                        "URL": "https://alnyk.pages.dev",
                        "Tags": ["Personal", "Portfolio", "Personal Project"]
                      },
                      {
                        "Type": "Folder",
                        "Id": 13,
                        "Title": "Folder with ID 4",
                        "Bookmarks":
                          [
                            {
                              "Type": "Bookmark",
                              "Id": 14,
                              "Title": "Has Id 10",
                              "URL": "https://wikipedia.com",
                              "Tags": ["Information", "Info"]
                            },
                            {
                              "Type": "Bookmark",
                              "Id": 15,
                              "Title": "Has Id 11, and some long title for some article perhaps.",
                              "URL": "https://alnyk.pages.dev",
                              "Tags": ["Personal", "Portfolio", "Personal Project"]
                            }
                          ]
                      }
                    ]
                }
              ]
          },
          {
            "Type": "Bookmark",
            "Id": 16,
            "Title": "Has Id 9, and is medium long",
            "URL": "https://alnyk.pages.dev",
            "Tags": ["Personal", "Portfolio", "Personal Project"]
          }
        ]
    },
    {
      "Type": "Bookmark",
      "Id": 17,
      "Title": "Title of the Bookmark, has ID 0",
      "URL": "https://vg.no",
      "Tags": ["News", "Norwegian News", "Demo Website"]
    },
    {
      "Type": "Folder",
      "Id": 18,
      "Title": "Some Folder Name Here",
      "Bookmarks":
        [
          {
            "Type": "Bookmark",
            "Id": 19,
            "Title": "Has Id 1, bit short",
            "URL": "https://wikipedia.com",
            "Tags": ["Information", "Info"]
          },
          {
            "Type": "Bookmark",
            "Id": 20,
            "Title": "Has Id 2",
            "URL": "https://alnyk.pages.dev",
            "Tags": ["Personal", "Portfolio", "Personal Project"]
          }
        ]
    },
    {
      "Type": "Bookmark",
      "Id": 21,
      "Title": "Title of the second Bookmark, very very very long, maybe fit an URL here?",
      "URL": "https://vg.no",
      "Tags": ["News", "Norwegian News", "Demo Website"]
    },
    {
      "Type": "Folder",
      "Id": 22,
      "Title": "Some New Folder Name Here, has ID 1",
      "Bookmarks":
        [
          {
            "Type": "Bookmark",
            "Id": 23,
            "Title": "fdjskal;fgjkdsal;,, Has Id 4",
            "URL": "https://wikipedia.com",
            "Tags": ["Information", "Info"]
          },
          {
            "Type": "Folder",
            "Id": 24,
            "Title": "Folder, has ID 2",
            "Bookmarks":
              [
                {
                  "Type": "Bookmark",
                  "Id": 25,
                  "Title": "Has Id 5...",
                  "URL": "https://wikipedia.com",
                  "Tags": ["Information", "Info"]
                },
                {
                  "Type": "Bookmark",
                  "Id": 26,
                  "Title": "Has Id 6, some more nesting inside here...",
                  "URL": "https://alnyk.pages.dev",
                  "Tags": ["Personal", "Portfolio", "Personal Project"]
                },
                {
                  "Type": "Folder",
                  "Id": 27,
                  "Title": "Some Folder with ID 3",
                  "Bookmarks":
                    [
                      {
                        "Type": "Bookmark",
                        "Id": 28,
                        "Title": "Title of the second Bookmark, very very very long, maybe fit an URL here?",
                        "URL": "https://wikipedia.com",
                        "Tags": ["Information", "Info"]
                      },
                      {
                        "Type": "Bookmark",
                        "Id": 29,
                        "Title": "Has Id 8",
                        "URL": "https://alnyk.pages.dev",
                        "Tags": ["Personal", "Portfolio", "Personal Project"]
                      },
                      {
                        "Type": "Folder",
                        "Id": 30,
                        "Title": "Folder with ID 4",
                        "Bookmarks":
                          [
                            {
                              "Type": "Bookmark",
                              "Id": 31,
                              "Title": "Has Id 10",
                              "URL": "https://wikipedia.com",
                              "Tags": ["Information", "Info"]
                            },
                            {
                              "Type": "Bookmark",
                              "Id": 32,
                              "Title": "Has Id 11, and some long title for some article perhaps.",
                              "URL": "https://alnyk.pages.dev",
                              "Tags": ["Personal", "Portfolio", "Personal Project"]
                            }
                          ]
                      }
                    ]
                }
              ]
          },
          {
            "Type": "Bookmark",
            "Id": 33,
            "Title": "Has Id 9, and is medium long",
            "URL": "https://alnyk.pages.dev",
            "Tags": ["Personal", "Portfolio", "Personal Project"]
          }
        ]
    }
  ];
}
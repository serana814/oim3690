# Packing List Builder

A web-based packing list tool that lets you add items by category, check
them off as you pack, and filter by what's still needed vs. already packed.

## Live site
https://serana814.github.io/packing-list

## How to use
1. Click the edit button next to the name of the list and input the name of the trip you are packing for
2. Choose a category from the dropdown (Clothing, Toiletries, Documents, etc.) 
3. Type an item name in the input bar and press "Enter" or click "Add"
4. Click any item to mark it as packed (it gets crossed off automatically)
5. Use the filters at the top to view All, Still needed, or Packed items
6. Click Pack all, Unpack all, or Clear list at the bottom to reset

## What I learned
The most challenging part of this project for me was building the filter feature. I had originally assumed filtering would delete items from the list, however, I learned that the actual way to do it is to keep all the data in one array and just change "what you show" based on the current filter. The render() function re-reads all of the items every time and chooses which ones to display meanwhile the data itself never changes from its memory when you click a filter. My biggest takeaway from this project was understanding that separation in data storage. I also learned how localStorage works to save data between sessions. Every time the list changes, the app stores it in the browser, so your list is still there when you close the tab and come back.

## Built with
- HTML, CSS, and JavaScript

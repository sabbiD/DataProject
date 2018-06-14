# Style Guide
Based on [W3 schools](https://www.w3schools.com/js/js_conventions.asp).

## Headers
Headers are multi-line comments.  
Each header starts with the author's name and student number, followed by a description of the program.

Example  
```javascript
/*
 *  Sammy Heutz
 *  10445765
 * 
 * Barchart.js contains the functions that creates the barchart via index.js
**/
```

## Variable names
All variables are in camelCase, with variable names starting with a letter.  

Example  
```javascript
var camelCase = "camel";
```
## Comments
Single comment lines start with //. They start with capital case but do not end with punctuation

Example
```javascript
// This is a comment
```

## Operators
All operators (+, -, etc) are encased by spaces. Each comma is followed by a space.

Example  
```javascript

var x = 10, y = 15;
for (var i = 0; i < data.length; i++){ 
    var z = (x + y) * i;
}
```

## Code indentation
All indentation consists of either 4 spaces or 1 tab.  

## Statement rules
Simple statements are ended with a semicolon.

Example  
```javascript
var x = 15;

```

### Complex statements
Return statements are followed by a semicolon.  
Within functions, if statements or for loops, statements are followed by a semicolon.  
Functions, if statements or for loops are **not** followed by a semicolon.  

Example
```javascript
function multiplyByTen(array){
    for (var i = 0; i < array.length; i++){
        array[i] *= 10;
    }
    return array;
}

```

## Bracket rules
Opening brackets are placed on the same line as the start of the statement.  
Closing brackets are placed on a separate line.  

## Line length
Lines longer than 80 characters are avoided where possible.  
Authors:
- Sammy Heutz
- Sylvie Langhout
- Sebile Demirtaş
- Sjoerd Zagema 

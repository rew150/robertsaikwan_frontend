export default function replaceBreaksWithParagraphs(input) {
  input = filterEmpty(input.split('\n')).join('</p><p>');
  return '<p>' + input + '</p>';
}


function filterEmpty(arr) {
  var new_arr = [];
  
  for (var i = arr.length-1; i >= 0; i--)
  {
      if (arr[i] !== "")
          new_arr.push(arr.pop());
      else
          arr.pop();
  }
  
  return new_arr.reverse();
};

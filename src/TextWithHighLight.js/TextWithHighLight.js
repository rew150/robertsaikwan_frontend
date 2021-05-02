import './TextWithHighLight.css';
import { useEffect, useState } from "react";
import { kyp } from "../utils/kyp";
import replaceBreaksWithParagraphs from '../utils/replaceBreaksWithParagraphs';

function TextWithHighLight({ name, ...rest }) {
  const [content, setContent] = useState('');
  useEffect(() => {
    if (!name) {
      setContent('<h3>Please select some news in the side menu</h3>')
      return
    }
    (async () => {
      try {
        const res = await kyp.get(`news/${encodeURIComponent(name)}`).json()
        const text = res.textbody
        const summary = res.summary
        const pos = text.indexOf(summary)

        const formattedHeader = `
          <p class='twhl-header'>
            ${name}
          </p>
        `
        if (pos < 0) {
          setContent(`
            ${formattedHeader}
            <b>News:</b>
            ${replaceBreaksWithParagraphs(text)}
            <b>Summarization:</b>
            <p>
            ${replaceBreaksWithParagraphs(summary)}
            </p>
          `)
        } else {
          const head = text.slice(0, pos);
          const mid = `<span class="highlighted">${text.slice(pos, pos+summary.length)}</span>`;
          const tail = text.slice(pos+summary.length);
          console.log(head+mid+tail)
          console.log(replaceBreaksWithParagraphs(head+mid+tail))
          setContent(`
            ${formattedHeader}
            ${replaceBreaksWithParagraphs(head+mid+tail)}
          `)
        }
      } catch (error) {
        setContent('<span style="color: red;"><h3>Error fetching</h3></span>')
      }
    })();
  }, [name])

  return (
    <div dangerouslySetInnerHTML={{ __html: (content ? content : '')}} {...rest} />
  );
}
export default TextWithHighLight;

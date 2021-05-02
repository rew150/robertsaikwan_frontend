import { useEffect, useState } from "react";
import { kyp } from "../utils/kyp";

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
        setContent(`
        <p>
          ${text}
        </p>
        <p>
          ${summary}
        </p>
        `)
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

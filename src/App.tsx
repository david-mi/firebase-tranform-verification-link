import { useEffect } from "react"
import { transformVerifyLink, setLinkToClipboard } from "./utils";
import styles from "./styles.module.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  function handleDocumentVisibilityChange() {
    const isDocumentVisible = document.hidden === false
    if (isDocumentVisible === false) return

    document.body.focus()
  }

  async function handleDocumentPaste({ clipboardData }: ClipboardEvent) {
    if (clipboardData === null) return
    const pastedLink = clipboardData.getData("text")
    try {
      const transformedLink = transformVerifyLink(pastedLink.trim())
      await setLinkToClipboard(transformedLink)
      toast.success("Lien ajouté au presse papier")
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  useEffect(() => {
    document.addEventListener("visibilitychange", handleDocumentVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleDocumentVisibilityChange);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("paste", handleDocumentPaste);

    return () => {
      document.removeEventListener("paste", handleDocumentPaste);
    };
  }, []);

  return (
    <>
      <div className={styles.app}>
        <h1>Paste your emulator verification link</h1>
      </div>
      <ToastContainer
        position="top-right"
        pauseOnHover={false}
        theme="light"
        autoClose={1500}
        className={styles.toast}
        toastClassName={styles.toast}
        pauseOnFocusLoss={false}
      />
    </>
  );
}

export default App

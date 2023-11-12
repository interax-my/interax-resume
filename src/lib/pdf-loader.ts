import { PDFLoader } from "langchain/document_loaders/fs/pdf";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function getPdfData(path: string) {
  try {
    const loader = new PDFLoader(path, { splitPages: false });
    const docs = await loader.load();

    // const textSplitter = new RecursiveCharacterTextSplitter({
    //   chunkSize: 1000,
    //   chunkOverlap: 200,
    // });

    // const chunkedDocs = await textSplitter.splitDocuments(docs);

    return docs;
  } catch (e: any) {
    throw new Error(e.message);
  }
}
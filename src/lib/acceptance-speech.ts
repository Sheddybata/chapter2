import speechData from "../../content/acceptance-speech.json";

export type AcceptanceSpeech = {
  title: string;
  subtitle: string;
  paragraphs: string[];
};

export const acceptanceSpeech = speechData as AcceptanceSpeech;

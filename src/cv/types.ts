export type CvElement =
  | { type: "h1"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "subtitle"; text: string }
  | { type: "text"; text: string[]; paragraphSpacing?: number }
  | { type: "list"; items: string[] };

export type CvDocument = {
  name: string;
  content: CvElement[];
};

export type CvLayoutConfig = {
  fontFamily: string;
  baseFontSize: number;
  h1FontSize: number;
  h2FontSize: number;
  lineHeight: number;
  subtitleColor: string;
  pageMargin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
};

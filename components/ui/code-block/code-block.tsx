import type { BundledLanguage } from "shiki";
import { codeToHtml } from "shiki";
import CopyButton from "@/components/ui/code-block/copy-button";
import CodeBlockHtml from "@/components/ui/code-block/code-block-html";
import { WindowCode, SquareCode, CodeEditor, ImageBinary } from "@/assets/svgs";

type CodeBlockType = "code" | "command" | "snippet" | "css" | "terminal";

interface CodeBlockProps {
  language: BundledLanguage;
  type?: CodeBlockType;
  code: string;
  clickToViewMore?: boolean;
  maxHeight?: number;
  title?: string;
  heightAuto?: boolean;
}

// Server Component (async) - for use in server-side pages
const CodeBlock = async ({
  language,
  code,
  heightAuto = false,
  title,
  type = "terminal",
}: CodeBlockProps) => {
  const html = await codeToHtml(code, {
    lang: language,
    theme: "one-dark-pro",
  });

  return (
    <div className="bg-border/40 p-1 rounded-[14px] group dark:shadow-md ">
      <div className="pb-2 py-1 px-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getCodeBlockIcon(type)}
          <span className="text-xs text-muted-foreground font-medium leading-none">
            {title ? title : language}
          </span>
        </div>
        <CopyButton code={code} />
      </div>
      <CodeBlockHtml html={html} heightAuto={heightAuto} />
    </div>
  );
};

// Client Component (non-async) - for use in client components with pre-generated HTML
interface CodeBlockClientProps {
  html: string;
  code: string;
  language: BundledLanguage;
  clickToViewMore?: boolean;
  title?: string;
  type?: CodeBlockType;
}

const CodeBlockClient = ({
  html,
  code,
  language,
  title,
  type = "terminal",
}: CodeBlockClientProps) => {
  return (
    <div className="bg-border/40 p-1 rounded-[14px] group dark:shadow-md h-auto">
      <div className="pb-2 py-1 px-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getCodeBlockIcon(type)}
          <span className="text-xs text-muted-foreground font-medium leading-none">
            {title ? title : language}
          </span>
        </div>
        <CopyButton code={code} />
      </div>
      <CodeBlockHtml html={html} />
    </div>
  );
};

const AddShadcnCodeBlock = ({ text }: { text: string }) => {
  return (
    <div className="bg-border/40 p-1 rounded-[14px] group dark:shadow-md flex flex-col">
      <div className="flex justify-between px-3 py-1 items-center">
        <span className="text-xs text-muted-foreground">Command</span>
        <CopyButton code={text} />
      </div>
      <span className="p-3 text-sm bg-white dark:bg-[#27272A] rounded-xl font-medium text-secondary-foreground">
        {text}
      </span>
    </div>
  );
};

export { CodeBlock, CodeBlockClient, AddShadcnCodeBlock };

const getCodeBlockIcon = (type: CodeBlockType) => {
  switch (type) {
    case "code":
      return <CodeEditor />;
    case "command":
      return <WindowCode />;
    case "snippet":
      return <SquareCode />;
    case "css":
      return <ImageBinary />;
    case "terminal":
      return <SquareCode />;
    default:
      return <SquareCode />;
  }
};

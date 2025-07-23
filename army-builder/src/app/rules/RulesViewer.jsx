"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const RULES_FILES = [
  { id: `core-rules`, name: `Core Rules`, file: `Core-Rules.md` },
  { id: `character-creation`, name: `Character Creation`, file: `Character-Creation.md` },
];

const classNames = {
  container: `w-full max-w-6xl mx-auto`,
  navigation: {
    wrapper: `mb-6`,
    title: `text-3xl font-bold mb-4`,
    buttonContainer: `flex flex-wrap gap-2`,
    button: {
      base: `px-4 py-2 rounded-md font-medium transition-colors duration-200`,
      active: `bg-blue-600 text-white`,
      inactive: `bg-gray-200 text-gray-700 hover:bg-gray-300`,
    },
  },
  content: {
    wrapper: `bg-white rounded-lg shadow-lg p-6 min-h-[400px]`,
    loading: {
      container: `flex items-center justify-center h-32`,
      text: `text-lg text-gray-600`,
    },
    error: {
      container: `bg-red-50 border border-red-200 rounded-md p-4`,
      title: `text-red-800 font-medium`,
      message: `text-red-600 text-sm mt-1`,
    },
    prose: `prose prose-lg max-w-none`,
  },
  markdown: {
    h1: `text-3xl font-bold mb-4 text-gray-900`,
    h2: `text-2xl font-bold mb-3 mt-6 text-gray-900`,
    h3: `text-xl font-bold mb-2 mt-4 text-gray-900`,
    h4: `text-lg font-bold mb-2 mt-3 text-gray-900`,
    p: `mb-3 text-gray-700 leading-relaxed`,
    ul: `list-disc list-inside mb-3 space-y-1`,
    ol: `list-decimal list-inside mb-3 space-y-1`,
    li: `text-gray-700`,
    blockquote: `border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4`,
    code: `bg-gray-100 px-1 py-0.5 rounded text-sm font-mono`,
    pre: `bg-gray-100 p-4 rounded-md overflow-x-auto mb-4`,
    table: {
      wrapper: `overflow-x-auto mb-6`,
      table: `min-w-full border-collapse border border-gray-300 bg-white shadow-sm rounded-lg`,
      thead: `bg-gray-50`,
      tbody: `bg-white divide-y divide-gray-200`,
      tr: `hover:bg-gray-50`,
      th: `border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900 bg-gray-100`,
      td: `border border-gray-300 px-4 py-3 text-gray-700 whitespace-nowrap`,
    },
    strong: `font-bold text-gray-900`,
    em: `italic text-gray-800`,
  },
};

export default function RulesViewer() {
  const [selectedRule, setSelectedRule] = useState(`core-rules`);
  const [markdownContent, setMarkdownContent] = useState(``);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        setLoading(true);
        setError(null);

        const ruleFile = RULES_FILES.find(rule => rule.id === selectedRule);
        if (!ruleFile) {
          throw new Error(`Rule file not found`);
        }

        // Fetch the markdown file from the public directory or repository root
        const response = await fetch(`/${ruleFile.file}`);
        if (!response.ok) {
          throw new Error(`Failed to load ${ruleFile.name}`);
        }

        const content = await response.text();
        setMarkdownContent(content);
      }
      catch (err) {
        setError(err.message);
        setMarkdownContent(``);
      }
      finally {
        setLoading(false);
      }
    };

    loadMarkdown();
  }, [selectedRule]);

  return (
    <div className={classNames.container}>
      {/* Rules Navigation */}
      <div className={classNames.navigation.wrapper}>
        <h1 className={classNames.navigation.title}>Game Rules</h1>
        <div className={classNames.navigation.buttonContainer}>
          {RULES_FILES.map(rule => (
            <button
              key={rule.id}
              onClick={() => setSelectedRule(rule.id)}
              className={`${classNames.navigation.button.base} ${
                selectedRule === rule.id
                  ? classNames.navigation.button.active
                  : classNames.navigation.button.inactive
              }`}
            >
              {rule.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content Display */}
      <div className={classNames.content.wrapper}>
        {loading && (
          <div className={classNames.content.loading.container}>
            <div className={classNames.content.loading.text}>Loading...</div>
          </div>
        )}

        {error && (
          <div className={classNames.content.error.container}>
            <div className={classNames.content.error.title}>Error loading rules</div>
            <div className={classNames.content.error.message}>{error}</div>
          </div>
        )}

        {!loading && !error && markdownContent && (
          <div className={classNames.content.prose}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Custom styling for markdown elements
                h1: ({ children }) => <h1 className={classNames.markdown.h1}>{ children }</h1>,
                h2: ({ children }) => <h2 className={classNames.markdown.h2}>{ children }</h2>,
                h3: ({ children }) => <h3 className={classNames.markdown.h3}>{ children }</h3>,
                h4: ({ children }) => <h4 className={classNames.markdown.h4}>{ children }</h4>,
                p: ({ children }) => <p className={classNames.markdown.p}>{ children }</p>,
                ul: ({ children }) => <ul className={classNames.markdown.ul}>{ children }</ul>,
                ol: ({ children }) => <ol className={classNames.markdown.ol}>{ children }</ol>,
                li: ({ children }) => <li className={classNames.markdown.li}>{ children }</li>,
                blockquote: ({ children }) => (
                  <blockquote className={classNames.markdown.blockquote}>
                    { children }
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className={classNames.markdown.code}>
                    { children }
                  </code>
                ),
                pre: ({ children }) => <pre className={classNames.markdown.pre}>{ children }</pre>,
                table: ({ children }) => (
                  <div className={classNames.markdown.table.wrapper}>
                    <table className={classNames.markdown.table.table}>
                      { children }
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className={classNames.markdown.table.thead}>
                    { children }
                  </thead>
                ),
                tbody: ({ children }) => (
                  <tbody className={classNames.markdown.table.tbody}>
                    { children }
                  </tbody>
                ),
                tr: ({ children }) => (
                  <tr className={classNames.markdown.table.tr}>
                    { children }
                  </tr>
                ),
                th: ({ children }) => (
                  <th className={classNames.markdown.table.th}>
                    { children }
                  </th>
                ),
                td: ({ children }) => (
                  <td className={classNames.markdown.table.td}>
                    { children }
                  </td>
                ),
                strong: ({ children }) => (
                  <strong className={classNames.markdown.strong}>
                    { children }
                  </strong>
                ),
                em: ({ children }) => (
                  <em className={classNames.markdown.em}>
                    { children }
                  </em>
                ),
              }}
            >
              {markdownContent}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

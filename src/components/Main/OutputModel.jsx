import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const OutputModel = ({ content }) => {
  return (
    <div>
      <ReactMarkdown
        components={{
          // Customize code blocks
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                className="rounded-md"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={`${className} bg-gray-700 rounded-md px-2 py-1`} {...props}>
                {children}
              </code>
            );
          },
          // Customize other elements
          p: ({ children }) => <p className="mb-4">{children}</p>,
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold mb-4 text-purple-400">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold mb-3 text-purple-400">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-bold mb-2 text-purple-400">{children}</h3>
          ),
          ul: ({ children }) => <ul className="list-disc ml-6 mb-4">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal ml-6 mb-4">{children}</ol>,
          li: ({ children }) => <li className="mb-1">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-purple-500 pl-4 mb-4 italic">
              {children}
            </blockquote>
          ),
          a: ({ children, href }) => (
            <a href={href} className="text-purple-400 hover:text-purple-300 underline">
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
      </div>
  );
};

export default OutputModel; 
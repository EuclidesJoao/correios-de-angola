import React from "react";

interface GetPageContentProps {
  content: string;
}

const GetPageContent: React.FC<GetPageContentProps> = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default GetPageContent;

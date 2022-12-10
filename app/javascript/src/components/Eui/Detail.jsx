import React, { useState } from "react";

import { Search } from "neetoicons";
import { Tag, Typography, Modal, Input, Button } from "neetoui";
import { Container } from "neetoui/layouts";

import { formatDateAndTime } from "../Dashboard/Articles/utils";

const Detail = ({
  activeArticle,
  category,
  showModal,
  setShowModal,
  categories,
}) => {
  const inputRef = React.useRef(null);
  const buttonRef = React.useRef(null);

  const [searchTerm, setSearchTerm] = useState("");

  // const handleSearch = async searchTerm => {
  //   try {
  //     const {
  //       data: { articles },
  //     } = await articlesApi.fetch({ title: searchTerm });
  //     setSearchedArticles(articles);
  //   } catch (error) {
  //     logger.error(error);
  //   }
  // };

  return (
    <Container className="mx-10">
      <Typography className="my-5" style="h1">
        {activeArticle["title"]}
      </Typography>
      {activeArticle.title && (
        <span className="my-3 flex">
          {" "}
          <Tag label={category} />{" "}
          <span className="mx-2 text-gray-600">
            {formatDateAndTime(activeArticle.date)}
          </span>
        </span>
      )}
      <p>{activeArticle.body}</p>
      <Modal
        finalFocusRef={buttonRef}
        initialFocusRef={inputRef}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <Modal.Header>
          <Typography style="h2">All Articles</Typography>
        </Modal.Header>
        <Modal.Body className="space-y-2">
          <Input
            placeholder="Search For Articles"
            prefix={<Search />}
            ref={inputRef}
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              //handleSearch(e.target.value);
            }}
          />
          {categories.map(category =>
            category["articles"].map(
              (article, idx) =>
                article.slug && (
                  <Typography key={idx} style="h4">
                    {article.title}
                  </Typography>
                )
            )
          )}
        </Modal.Body>
        <Modal.Footer className="space-x-2">
          <Button label="Cancel" onClick={() => setShowModal(false)} />
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Detail;

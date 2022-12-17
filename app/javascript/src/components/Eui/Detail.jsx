import React, { useState, useEffect } from "react";

import { Tag, Typography, Modal, Button, PageLoader, Select } from "neetoui";
import { Container } from "neetoui/layouts";
import { useHistory } from "react-router-dom";

import articlesApi from "apis/public/articles";

import { formatDateAndTime } from "../Dashboard/Articles/utils";

const Detail = ({ activeArticle, category, showModal, setShowModal }) => {
  const inputRef = React.useRef(null);
  const buttonRef = React.useRef(null);
  const [articles, setArticles] = useState([]);
  const [searchedArticles, setSearchedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const handleChange = e => {
    const searchedArticle = articles.find(({ id }) => id === e.value);
    history.push(
      `/public/${searchedArticle.category.category}/${searchedArticle.slug}`
    );
    window.location.reload();
  };

  const fetchArticles = async () => {
    try {
      const {
        data: { articles },
      } = await articlesApi.fetch();
      setArticles(articles);
      const articleList = articles.map(article => ({
        value: article.id,
        label: article.title,
      }));
      setSearchedArticles(articleList);
    } catch (error) {
      logger.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

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
        onClose={() => {
          setShowModal(false);
        }}
      >
        <Modal.Header>
          <Typography style="h2">Articles</Typography>
        </Modal.Header>
        <Modal.Body className="space-y-2">
          <Select
            isClearable
            isSearchable
            openMenuOnFocus
            name="articles"
            options={searchedArticles}
            placeholder="Select an article"
            onChange={e => handleChange(e)}
          />
        </Modal.Body>
        <Modal.Footer className="space-x-2">
          <Button
            label="Cancel"
            onClick={() => {
              setShowModal(false);
            }}
          />
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Detail;

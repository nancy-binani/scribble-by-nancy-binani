import React, { useState, useEffect } from "react";

import { Search } from "neetoicons";
import { Tag, Typography, Modal, Input, Button, PageLoader } from "neetoui";
import { Container } from "neetoui/layouts";
import { useHistory } from "react-router-dom";

import articlesApi from "apis/public/articles";

import { formatDateAndTime } from "../Dashboard/Articles/utils";

const Detail = ({ activeArticle, category, showModal, setShowModal }) => {
  const inputRef = React.useRef(null);
  const buttonRef = React.useRef(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const fetchArticles = async () => {
    try {
      const {
        data: { articles },
      } = await articlesApi.fetch();
      setArticles(articles);
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

  const handleSearch = async searchTerm => {
    try {
      const {
        data: { articles },
      } = await articlesApi.fetch({ title: searchTerm });
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    }
  };

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
              handleSearch(e.target.value);
            }}
          />
          {articles.map(article => (
            <Typography
              key={article.id}
              style="h4"
              onClick={() => {
                history.push(`/public/${category}/${article.slug}`);
                window.location.reload();
              }}
            >
              {article.title}
            </Typography>
          ))}
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

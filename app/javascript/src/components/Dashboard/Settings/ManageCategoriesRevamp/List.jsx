import React from "react";

import { Clock } from "neetoicons";
import { Typography, Avatar, Checkbox, Tag, Tooltip } from "neetoui";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import articlesApi from "apis/admin/articles";

import {
  calculateCreatedAgo,
  formatDateAndTimeForToolTip,
} from "../../Articles/utils";

const List = ({ selectedCategory, selectedArticles, setSelectedArticles }) => {
  const handleUpdateWithPosition = async (position, id) => {
    try {
      await articlesApi.updateWithPosition(position, id);
    } catch (error) {
      logger.error(error);
    }
  };
  const handleOnDragEnd = result => {
    const items = selectedCategory.articles;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    handleUpdateWithPosition(result.destination.index + 1, reorderedItem.id);
  };

  const handleChecked = async article => {
    let newSelectedArticles = [];
    if (selectedArticles.includes(article.id)) {
      newSelectedArticles = selectedArticles.filter(
        selectedArticleId => article.id !== selectedArticleId
      );
    } else {
      newSelectedArticles = [...selectedArticles, article.id];
    }
    setSelectedArticles(newSelectedArticles);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="articles">
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {selectedCategory.articles.map((article, index) => (
              <Draggable
                draggableId={String(article.id)}
                index={index}
                key={article.id}
              >
                {provided => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <div className="border-slate-300 shadow-slate-300 h-44 box-border items-start rounded-sm border-2 bg-white p-3 shadow-md">
                      <Checkbox
                        className="mb-3"
                        onChange={() => handleChecked(article)}
                      />
                      <div className="flex justify-between text-xl font-bold">
                        <Typography style="h5">{article.title}</Typography>
                      </div>
                      <Typography
                        className="truncate mb-3 text-gray-800"
                        style="body3"
                      >
                        {article.body}
                      </Typography>
                      <hr />
                      <div className="flex items-center justify-end">
                        <div className="flex justify-end">
                          <Clock className="mx-1 mt-3" />
                          <Tooltip
                            followCursor="horizontal"
                            position="bottom"
                            content={formatDateAndTimeForToolTip(
                              article.created_at
                            )}
                          >
                            <Typography className="mx-1 mt-4" style="body3">
                              {article.status === "draft"
                                ? "Drafted"
                                : "Published"}{" "}
                              {calculateCreatedAgo(article.created_at)}
                            </Typography>
                          </Tooltip>
                          {article.status === "draft" && (
                            <Avatar
                              className="mx-1 mt-2"
                              size="small"
                              user={{ name: selectedCategory.author.name }}
                            />
                          )}
                          {article.status === "draft" ? (
                            <Tag
                              className="mx-1 mt-2"
                              label={article.status}
                              style="warning"
                            />
                          ) : (
                            <Tag
                              className="mx-1 mt-2"
                              label={article.status}
                              style="info"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <br />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default List;

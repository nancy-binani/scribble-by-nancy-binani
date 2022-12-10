import React from "react";

import {
  Modal as NeetoUIModal,
  Typography,
  Button,
  Input,
  Textarea,
} from "neetoui";

import articlesApi from "apis/admin/articles";

const Modal = ({ version, showModal, setShowModal, history }) => {
  const handleRestore = async () => {
    try {
      const articleData = {
        title: version.article.title,
        body: version.article.body,
        status: "drafted",
        category_id: version.article.category_id,
        version_status: true,
        restored_at: version.article.updated_at,
      };
      await articlesApi.update(articleData, version.article.id);
      await articlesApi.fetch();
      setShowModal(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <NeetoUIModal
      isOpen={showModal}
      size="large"
      onClose={() => setShowModal(false)}
    >
      <NeetoUIModal.Header description="Version history of Setting up an account in Scribble.">
        <Typography style="h2">Version History</Typography>
      </NeetoUIModal.Header>
      <NeetoUIModal.Body className="space-y-2">
        <div className="my-5 flex gap-x-4">
          <Input
            disabled
            className="bg-slate-700 mr-3 w-5/12"
            label="Article Title"
            value={version.article.title}
          />
          <Input
            disabled
            className="w-56"
            label="Category"
            value={version.category.category}
          />
        </div>
        <Textarea
          disabled
          label="Article Body"
          rows={30}
          value={version.article.body}
        />
      </NeetoUIModal.Body>
      <NeetoUIModal.Footer>
        <div className="flex space-x-2">
          <Button
            disabled={version.article.version_status}
            label="Restore version"
            onClick={handleRestore}
          />
          <Button
            label="Cancel"
            style="text"
            onClick={() => setShowModal(false)}
          />
        </div>
      </NeetoUIModal.Footer>
    </NeetoUIModal>
  );
};
export default Modal;
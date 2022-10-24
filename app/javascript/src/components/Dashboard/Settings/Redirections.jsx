import React, { useEffect, useState } from "react";

import { Check, Delete, Edit, Plus } from "@bigbinary/neeto-icons";
import { PageLoader, Typography, Input, Toastr } from "@bigbinary/neetoui";

import redirectionsApi from "apis/redirection";

const Redirections = () => {
  const [redirections, setRedirections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [createNewRedirection, setCreateNewRedirection] = useState(false);
  const [oldurl, setOldurl] = useState("");
  const [newurl, setNewurl] = useState("");
  const [id, setId] = useState("");

  const fetchRedirections = async () => {
    try {
      const {
        data: { redirections },
      } = await redirectionsApi.fetch();
      setRedirections(redirections);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRedirections();
  }, []);

  const handleCreateRedirection = () => {
    setIsEdit(false);
    setCreateNewRedirection(!createNewRedirection);
  };

  const handleEditRedirection = ({ id }) => {
    setCreateNewRedirection(createNewRedirection => !createNewRedirection);
    setIsEdit(true);
    setId(id);
  };

  const handleDeleteRedirection = async id => {
    try {
      await redirectionsApi.destroy(id);
      await fetchRedirections();
      Toastr.success("Redirection is deleted successfully.");
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await redirectionsApi.update(
          {
            oldurl,
            newurl,
          },
          id
        );
        Toastr.success("Redirection is updated successfully.");
      } else {
        await redirectionsApi.create({
          oldurl,
          newurl,
        });
        Toastr.success("Redirection is created successfully.");
      }
      await fetchRedirections();
    } catch (error) {
      logger.error(error);
      Toastr.error("Cyclic redirections is not possible.");
    }
    setCreateNewRedirection(!createNewRedirection);
  };

  if (loading) {
    <PageLoader />;
  }

  return (
    <div className="my-6 px-24">
      <Typography style="h2">Redirections</Typography>
      <Typography className="my-6 text-gray-600" style="body2">
        Create and configure redirection rules to send users from old links to
        new links. All redirections are performed with 301 status codes to be
        SEO friendly.
      </Typography>
      <div className="bg-indigo-100">
        <div className=" flex justify-between p-8">
          <span className="text-gray-500">From Path</span>
          <span className="text-gray-500">To Path</span>
          <span className="text-gray-500">Actions</span>
        </div>
        {redirections.map(({ oldurl, newurl, id }) => (
          <>
            <div
              className="mx-3 flex justify-between bg-white px-8 py-4 tracking-tight"
              key={id}
            >
              <span>{`localhost:3000${oldurl}`}</span>
              <span>{`localhost:3000${newurl}`}</span>
              <span className="flex">
                <Edit
                  className="mr-2"
                  color="gray"
                  size={20}
                  onClick={() => handleEditRedirection({ id })}
                />
                <Delete
                  color="gray"
                  size={20}
                  onClick={() => handleDeleteRedirection(id)}
                />
              </span>
            </div>
            <br />
          </>
        ))}
        {createNewRedirection && (
          <div className="flex p-4 tracking-tight">
            <Input
              className="mr-10"
              name="oldurl"
              placeholder="https://scribble.com"
              value={oldurl}
              onChange={e => setOldurl(e.target.value)}
            />
            <Input
              className="mr-8"
              name="newurl"
              placeholder="https://scribble.com"
              value={newurl}
              onChange={e => setNewurl(e.target.value)}
            />
            <Check onClick={handleSubmit} />
          </div>
        )}
        <div className="my-6 flex p-4  text-indigo-500">
          <Plus size={20} />
          <Typography style="h5" onClick={handleCreateRedirection}>
            Add New Redirection
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Redirections;

import React, { useEffect, useState } from "react";

import { Check, Delete, Edit, Plus } from "neetoicons";
import { PageLoader, Typography, Input } from "neetoui";

import redirectionsApi from "apis/admin/redirections";

const Redirections = () => {
  const [redirections, setRedirections] = useState([]);
  const [showInput, setShowInput] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showId, setShowId] = useState(null);
  const [toPath, setToPath] = useState("");
  const [fromPath, setFromPath] = useState("");
  const [createRedirection, setCreateRedirection] = useState(false);
  const [updateRedirections, setUpdateRedirections] = useState(false);

  const fetchRedirections = async () => {
    try {
      const {
        data: { redirections },
      } = await redirectionsApi.fetch();
      setRedirections(redirections);
    } catch (error) {
      logger.error(error);
    }
    setUpdateRedirections(false);
    setLoading(false);
  };

  const handleDelete = async id => {
    try {
      setUpdateRedirections(true);
      await redirectionsApi.destroy(id);
    } catch (error) {
      logger.error(error);
    }
    await fetchRedirections();
    setLoading(false);
  };

  const handleSubmit = async () => {
    try {
      setUpdateRedirections(true);
      await redirectionsApi.create({ to: toPath, from: fromPath });
    } catch (error) {
      logger.error(error);
    }
    await fetchRedirections();
    setLoading(false);
    setCreateRedirection(false);
  };

  const handleCreateRedirection = () => {
    setCreateRedirection(!createRedirection);
    setUpdateRedirections(true);
    setToPath("/2");
    setFromPath("/1");
  };

  const handleUpdateRedirection = async () => {
    try {
      setUpdateRedirections(true);
      await redirectionsApi.update({ to: toPath, from: fromPath }, showId);
    } catch (error) {
      logger.error(error);
    }
    await fetchRedirections();
    setShowInput(false);
  };

  const handleEdit = (id, to, from) => {
    setShowId(id);
    setToPath(to);
    setFromPath(from);
    setShowInput(!showInput);
  };

  useEffect(() => {
    fetchRedirections();
  }, [updateRedirections]);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-1/2 flex-col space-y-6 py-6">
      <Typography style="h2">Redirections</Typography>
      <Typography className="text-gray-600" style="body2">
        Create and configure redirection rules to send users from old links to
        new links. All redirections are performed with 301 status codes to be
        SEO friendly.
      </Typography>
      <div className="flex items-start bg-indigo-100 p-6">
        <div className="w-full space-y-2 self-stretch text-left">
          <div className="flex justify-between">
            <span>From Path</span>
            <span>To Path</span>
            <span>Actions</span>
          </div>
          {redirections.map(({ from, to, id }) => (
            <div className="flex justify-between bg-white p-4" key={id}>
              {showInput && showId === id ? (
                <>
                  <div className="flex-col">
                    <span>{`localhost:3000${from}`}</span>
                    <Input
                      className="mt-2"
                      value={fromPath}
                      onChange={e => setFromPath(e.target.value)}
                    />
                  </div>
                  <div className="flex-col">
                    <span>{`localhost:3000${to}`}</span>
                    <Input
                      className="mt-2"
                      value={toPath}
                      onChange={e => setToPath(e.target.value)}
                      onKeyDown={e => {
                        e.key === "Enter" && handleUpdateRedirection(id);
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <span>{`localhost:3000${from}`}</span>
                  <span>{`localhost:3000${to}`}</span>
                </>
              )}
              <span className="flex justify-center">
                <Edit
                  size={20}
                  onClick={() => {
                    handleEdit(id, to, from);
                  }}
                />
                <Delete size={20} onClick={() => handleDelete(id)} />
              </span>
            </div>
          ))}
          {createRedirection && (
            <div className="flex justify-between bg-white p-4">
              <div className="flex-col">
                <Input
                  value={fromPath}
                  onChange={e => setFromPath(e.target.value)}
                />
              </div>
              <div className="flex-col">
                <Input
                  value={toPath}
                  onChange={e => setToPath(e.target.value)}
                />
              </div>
              <Check onClick={handleSubmit} />
            </div>
          )}
          <div className="my-6 flex p-4 text-indigo-500">
            <Plus size={20} onClick={handleCreateRedirection} />
            <Typography style="h5">Add New Redirection</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Redirections;

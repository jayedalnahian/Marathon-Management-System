import React, { useContext, useState } from "react";
import { MdDelete, MdEdit, MdPeople } from "react-icons/md";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosInterceptor from "../../../CustomHooks/useAxiosInterceptor";
import { AuthContext } from "../../../AuthProvider/AuthContext";

const MyMarathons = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["projects"], // unique key for caching
    queryFn: async () => {
      const res = await axiosInterceptor.get(
        `/my-applied-marathons/${user?.email}`
      );
      return res.data;
    },
  });
  // Dummy data

  const [showModal, setShowModal] = useState(false);
  const [showApplicants, setShowApplicants] = useState(false);
  const [selectedMarathon, setSelectedMarathon] = useState(null);
  const axiosInterceptor = useAxiosInterceptor();
  const { user } = useContext(AuthContext);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  console.table(data);

  const handleViewApplicants = (marathon) => {
    setSelectedMarathon(marathon);
    setShowApplicants(true);
  };

  const handleEdit = (marathon) => {
    setSelectedMarathon(marathon);
    setShowModal(true);
  };

  if (isLoading) {
    return (
      <div className="h-screen mx-auto">Data Is Comming..............</div>
    );
  }
  if (isError) {
    console.log(error);

    return (
      <div className="h-screen mx-auto">Something Went Wrong..............</div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-2 md:p-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-textMain">My Marathons</h1>
        <p className="text-secondary mt-2">Manage your created marathons</p>
      </div>

      {/* Marathon Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary text-background">
              <tr>
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Location</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Applicants</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary/20">
              {data?.map((marathon, index) => (
                <motion.tr
                  key={marathon._id}
                  whileHover={{ backgroundColor: "rgba(154, 203, 208, 0.1)" }}
                  className="hover:bg-secondary/10 transition-colors"
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4 font-medium text-textMain">
                    <Link
                      to={`/details/${marathon.id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {marathon.title}
                    </Link>
                  </td>
                  <td className="p-4">{marathon.location}</td>
                  <td className="p-4">{formatDate(marathon.startDate)}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleViewApplicants(marathon)}
                      className="flex items-center gap-1 text-primary hover:text-secondary transition-colors"
                    >
                      <MdPeople size={18} />
                      {marathon.applicants}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link to={`/details/${marathon._id}`}>
                        <button className="p-2 rounded-lg bg-primary/10 text-primary font-bold hover:bg-primary/20 transition-colors">
                          Details
                        </button>
                      </Link>
                      <button
                        onClick={() => handleEdit(marathon)}
                        className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        title="Edit"
                      >
                        <MdEdit size={18} />
                      </button>
                      <button
                        className="p-2 rounded-lg bg-error/10 text-error hover:bg-error/20 transition-colors"
                        title="Delete"
                      >
                        <MdDelete size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Applicants Modal */}
      {showApplicants && selectedMarathon && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowApplicants(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-textMain">
                  Applicants for {selectedMarathon.title}
                </h3>
                <button
                  onClick={() => setShowApplicants(false)}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {selectedMarathon?.totalRegistrationCount?.map(
                  (participant, i) => (
                    <div
                      key={i}
                      className="p-4 border border-secondary/20 rounded-lg"
                    >
                      <h4 className="font-medium text-textMain">
                        Participant {i + 1}
                      </h4>
                      <p className="text-sm text-gray-600">{`${participant?.firstName} ${participant?.lastName}`}</p>
                      <p className="text-sm text-gray-600">
                        {participant?.email}
                      </p>
                      <p className="text-sm text-gray-600">
                        {participant?.phone}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Edit Modal */}
      {showModal && selectedMarathon && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-textMain">
                  Edit {selectedMarathon.title}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-textMain mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={selectedMarathon.title}
                      className="w-full p-2 border border-secondary/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-textMain mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      defaultValue={selectedMarathon.location}
                      className="w-full p-2 border border-secondary/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-textMain mb-1">
                      Marathon Start Date
                    </label>
                    <input
                      type="date"
                      name="marathonStartDate"
                      defaultValue={selectedMarathon.marathonStartDate}
                      className="w-full p-2 border border-secondary/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-textMain mb-1">
                      Running Distance
                    </label>
                    <input
                      type="text"
                      name="runningDistance"
                      defaultValue={selectedMarathon.runningDistance}
                      className="w-full p-2 border border-secondary/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-textMain mb-1">
                      Registration Start Date
                    </label>
                    <input
                      type="date"
                      name="startRegistrationDate"
                      defaultValue={selectedMarathon.startRegistrationDate}
                      className="w-full p-2 border border-secondary/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-textMain mb-1">
                      Registration End Date
                    </label>
                    <input
                      type="date"
                      name="endRegistrationDate"
                      defaultValue={selectedMarathon.endRegistrationDate}
                      className="w-full p-2 border border-secondary/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-textMain mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      name="marathonImageURL"
                      defaultValue={selectedMarathon.marathonImageURL}
                      className="w-full p-2 border border-secondary/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-textMain mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    defaultValue={selectedMarathon.description}
                    rows="4"
                    className="w-full p-2 border border-secondary/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-background rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default MyMarathons;

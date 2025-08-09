import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const AddMarathon = () => {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (newMarathon) => {
      const res = await axios.post("https://your-api.com/marathons", newMarathon);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['marathons']);
      Swal.fire("Success!", "Marathon added successfully!", "success");
      reset();
    },
    onError: (err) => {
      Swal.fire("Error", err.message, "error");
    }
  });

  const onSubmit = (data) => {
    const marathon = {
      title: data.title,
      startRegistrationDate: data.startRegistrationDate,
      endRegistrationDate: data.endRegistrationDate,
      marathonStartDate: data.marathonStartDate,
      location: data.location,
      runningDistance: data.runningDistance,
      marathonImageURL: data.marathonImageURL,
      description: data.description,
      totalRegistrationCount: [],
      createdBy: data.createdBy || "admin@example.com",
      createdAt: new Date().toISOString()
    };
    mutate(marathon);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-4 rounded-xl shadow-lg my-10">
      <h2 className="text-2xl font-bold mb-6 text-primary">Add New Marathon</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className="label font-semibold">Title</label>
          <input {...register("title")} className="input input-bordered w-full" required />
        </div>

        <div>
          <label className="label font-semibold">Start Registration Date</label>
          <input type="date" {...register("startRegistrationDate")} className="input input-bordered w-full" required />
        </div>

        <div>
          <label className="label font-semibold">End Registration Date</label>
          <input type="date" {...register("endRegistrationDate")} className="input input-bordered w-full" required />
        </div>

        <div>
          <label className="label font-semibold">Marathon Start Date</label>
          <input type="date" {...register("marathonStartDate")} className="input input-bordered w-full" required />
        </div>

        <div>
          <label className="label font-semibold">Location</label>
          <input {...register("location")} className="input input-bordered w-full" required />
        </div>

        <div>
          <label className="label font-semibold">Running Distance (e.g. 10 KM)</label>
          <input {...register("runningDistance")} className="input input-bordered w-full" required />
        </div>

        <div>
          <label className="label font-semibold">Image URL</label>
          <input {...register("marathonImageURL")} className="input input-bordered w-full" required />
        </div>

        <div>
          <label className="label font-semibold">Created By (email)</label>
          <input {...register("createdBy")} className="input input-bordered w-full" />
        </div>

        <div className="md:col-span-2">
          <label className="label font-semibold">Description</label>
          <textarea {...register("description")} className="textarea textarea-bordered w-full" rows={4} required />
        </div>

        <div className="md:col-span-2">
          <button type="submit" className="btn btn-primary w-full mt-4">
            {isPending ? "Adding..." : "Add Marathon"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMarathon;

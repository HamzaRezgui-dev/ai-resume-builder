import { useQuery } from "@tanstack/react-query";
import AddResume from "./components/AddResume";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "@/service/GlobalApi";
import ResumeCardItem from "./components/ResumeCardItem";

function Dashboard() {
  const { user } = useUser();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["resumes", user?.primaryEmailAddress?.emailAddress],
    queryFn: () => {
      if (!user?.primaryEmailAddress?.emailAddress) {
        return Promise.resolve({
          resumes: [],
          pagination: { page: 1, pageCount: 0, total: 0, pageSize: 10 },
        });
      }
      return GlobalApi.getUserResumes(user.primaryEmailAddress.emailAddress);
    },
    enabled: !!user?.primaryEmailAddress?.emailAddress,
  });

  const resumes = data?.resumes;
  const pagination = data?.pagination;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start Creating Your AI Resume For Your Next Job Role</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
        <AddResume />
        {resumes?.map((resume) => (
          <ResumeCardItem key={resume.resumeId} resume={resume} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

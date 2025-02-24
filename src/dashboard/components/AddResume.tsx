import { Loader2, PlusSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import createNewResume from "@/service/GlobalApi";
import { useUser } from "@clerk/clerk-react";

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const onCreate = () => {
    const uuid = uuidv4();
    setLoading(true);
    if (user?.primaryEmailAddress?.emailAddress && user?.fullName) {
      createNewResume({
        resumeId: uuid,
        title: resumeTitle,
        userEmail: user.primaryEmailAddress.emailAddress,
        userName: user.fullName,
      }).then(
        (resp) => {
          if (resp) {
            setLoading(false);
            setResumeTitle("");
            setOpenDialog(false);
          }
        },
        (error) => {
          setLoading(false);
        }
      );
    } else {
      alert("Please login to create a resume");
    }
  };
  return (
    <div>
      <div
        onClick={() => setOpenDialog(true)}
        className="p-14 py-24 border border-dashed rounded-lg h-[360px] cursor-pointer hover:scale-105 transition-all hover:shadow-md items-center flex justify-center bg-secondary"
      >
        <PlusSquare />
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              Add a title for your new resume
              <Input
                className="my-2"
                placeholder="Ex.Full Stack resume"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="justify-end flex gap-5">
              <Button onClick={() => setOpenDialog(false)} variant="ghost">
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle || loading}
                onClick={() => onCreate()}
              >
                {loading && <Loader2 className="animate-spin" />}
                Create
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;

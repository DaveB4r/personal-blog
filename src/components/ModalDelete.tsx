import { FC } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import { BsTrash } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";

type Props = {
  id: string;
};

const ModalDelete: FC<Props> = ({ id }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const deletePost = async (id, onClose) => {
    try {
      const response = await fetch("/api/posts/delete-post", {
        method:"DELETE",
        body: JSON.stringify(id),
        headers: {
          "Content-Type" : "application/json"
        }
      });
      if(response.ok){
        const res = await response.json();
        if(res.message === 'Post deleted succesfully'){
          toast.success(res.message);
        }
      }
      onClose();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <Tooltip color="danger" content="Delete Post">
        <span>
          <Button onPress={onOpen} size="sm" variant="light" className="text-lg text-danger cursor-pointer active:opacity-50">
            <BsTrash />
          </Button>
        </span>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {
            (onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-2">Deleting {id}</ModalHeader>
                <ModalBody>
                  <p>Are you sure to delete this Post?</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="danger" onPress={() => deletePost(id,onClose)}>
                    Delete
                  </Button>
                </ModalFooter>
              </>
            )
          }
        </ModalContent>
      </Modal>
      <ToastContainer toastStyle={{backgroundColor: "black", color:"white"}} position="bottom-right" />
    </>
  );
};

export default ModalDelete;

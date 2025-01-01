import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileIcon, ImageIcon } from "lucide-react";

interface IdDocumentViewerProps {
  document: File;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const IdDocumentViewer = ({
  document,
  open,
  onOpenChange,
}: IdDocumentViewerProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>ID Document</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {document.type.startsWith("image/") ? (
            <div className="relative aspect-[16/9]">
              <img
                src={URL.createObjectURL(document)}
                alt="ID Document"
                className="rounded-lg object-contain w-full h-full"
              />
            </div>
          ) : document.type === "application/pdf" ? (
            <div className="flex items-center gap-2 text-blue-500 hover:text-blue-600">
              <FileIcon className="h-5 w-5" />
              <a
                href={URL.createObjectURL(document)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                View PDF Document
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              <a
                href={URL.createObjectURL(document)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 hover:underline"
              >
                View Document
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
import { FileIcon, ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

interface TransactionFileViewerProps {
  file?: File;
  fileUrl?: string;
  fileType?: string;
}

export const TransactionFileViewer = ({ file, fileUrl, fileType }: TransactionFileViewerProps) => {
  if (!file && !fileUrl) return null;

  const isImage = fileType?.startsWith("image/") || file?.type.startsWith("image/");
  const isPDF = fileType === "application/pdf" || file?.type === "application/pdf";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4"
    >
      <h3 className="font-semibold mb-2">Transaction Document</h3>
      {isImage ? (
        <div className="relative aspect-video bg-navy-dark rounded-lg overflow-hidden">
          <motion.img
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            src={fileUrl || (file && URL.createObjectURL(file))}
            alt="Transaction Document"
            className="rounded-lg object-contain w-full h-full"
          />
        </div>
      ) : isPDF ? (
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
        >
          <FileIcon className="h-5 w-5" />
          <a
            href={fileUrl || (file && URL.createObjectURL(file))}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            View PDF Document
          </a>
        </motion.div>
      ) : (
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-2"
        >
          <ImageIcon className="h-5 w-5 text-gray-400" />
          <a
            href={fileUrl || (file && URL.createObjectURL(file))}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 hover:underline"
          >
            View Document
          </a>
        </motion.div>
      )}
    </motion.div>
  );
};
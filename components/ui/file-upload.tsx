interface FileUploadProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  id: string
}

const FileUpload: React.FC<FileUploadProps> = ({ id, ...props }) => {
  return (
    <div className='w-full aspect-[16/9] bg-primary-foreground rounded-lg'>
      <input type='file' id={id} accept='image/png, image/jpeg' {...props} />
    </div>
  )
}

export default FileUpload

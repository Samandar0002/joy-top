interface DetailItemProps {
    icon: string;
    text: string | number;
  }
  
  
  const DetailItem: React.FC<DetailItemProps> = ({ icon, text }) => (
    <div className="flex items-center mb-2">
      <img src={icon} alt="" className="mr-2 h-4 w-4" />
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );

  export default DetailItem;
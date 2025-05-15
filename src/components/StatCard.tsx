const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center shadow-lg hover:shadow-blue-500/30 hover:scale-[1.03] transition-all duration-300">
    <h3 className="text-3xl font-bold text-white">{value}</h3>
    <p className="text-gray-300 mt-2">{label}</p>
  </div>
);
export default StatCard;
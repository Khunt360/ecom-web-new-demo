import Image from "next/image";

function NodataFound({ msg, mt }) {
  return (
    <div className="nodata" style={{ marginTop: mt }}>
      <Image
        loading='lazy'
        unoptimized  src="/images/no_data.webp" alt="no data" width={15} height={15} />
      <p>{msg}</p>
    </div>
  );
}

export default NodataFound;

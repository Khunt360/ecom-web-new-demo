function NodataFound({ msg, mt }) {
  return (
    <div className="nodata" style={{ marginTop: mt }}>
      <img src="/images/no_data.webp" alt="no data" />
      <p>{msg}</p>
    </div>
  );
}

export default NodataFound;

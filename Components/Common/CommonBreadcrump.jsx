import Link from "next/link";

const CommonBreadcrump = (props) => {
  return (
    <div className="com-bread">
      <p>
        <Link href="/">Home</Link> /
        {props?.link1 && <Link href={props?.link1}> {props?.sub1} /</Link>}
        {props?.link2 && <Link href={props?.link2}> {props?.sub2} /</Link>}
        {props?.link3 && <Link href={props?.link3}> {props?.sub3} / </Link>}
        {props?.title}
      </p>
    </div>
  );
};

export default CommonBreadcrump;

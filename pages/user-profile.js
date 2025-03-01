function UserProfile(props) {
  return <h1>{props.userName}</h1>;
}

export async function getServerSideProps(context) {
  const { params, req, res } = context;
  //console.log(req);
  //console.log(res);
  return {
    props: { userName: "Manu" },
  };
}

export default UserProfile;

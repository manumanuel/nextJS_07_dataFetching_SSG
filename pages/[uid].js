function UserPage(props) {
  return <h1>{props.userId}</h1>;
}

export async function getServerSideProps(context) {
  const { params } = context;
  return {
    props: { userId: 2 },
  };
}

export default UserPage;

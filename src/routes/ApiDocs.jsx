const ApiDocs = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">API Documentation</h2>
      <p>Welcome to the API documentation. Here you can find all the information about how to use our API.</p>
      <h3 className="text-xl font-semibold mt-4">Endpoints</h3>
      <ul className="list-disc list-inside mt-2">
        <li>
          <strong>GET /user/:id</strong>: Get user by ID.
        </li>
        <li>
          <strong>POST /user/login</strong>: Login a user.
        </li>
        <li>
          <strong>POST /user/register</strong>: Register a new user.
        </li>
        <li>
          <strong>POST /user/generate-api-key</strong>: Generate a new API key.
        </li>
        <li>
          <strong>POST /blog/:id/like</strong>: Like a blog post.
        </li>
        <li>
          <strong>POST /blog/:id/unlike</strong>: Unlike a blog post.
        </li>
      </ul>
    </div>
  );
};

export default ApiDocs;


const FormContent = () => {
  return (
    <form method="post" action="add-parcel.html">
      <div className="form-group">
        <label>Email Address</label>
        <input type="email" name="username" placeholder="Username" required />
      </div>
      {/* Email Address */}

      <div className="form-group">
        <label>Password</label>
        <input
          id="password-field"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
      </div>
      {/* Password */}

      <div className="form-group">
        <label>Are you currently a member of Rotaract or Rotary?</label>
        <select name="membership" required>
          <option value="" disabled selected>
            Select an option
          </option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      {/* Membership Question */}

      <div className="form-group">
        <button className="theme-btn btn-style-one" type="submit">
          Register
        </button>
      </div>
      {/* Register Button */}
    </form>
  );
};

export default FormContent;

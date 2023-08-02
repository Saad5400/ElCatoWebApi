import React from "react";
import { api, UserContext } from "../../App";

export default function Index() {

	const { token, setToken,
		isAdmin, setIsAdmin } = React.useContext(UserContext);

	return (
		<div className="bg-base-200 tajawal">
			<div className="min-h-screen">
				<div className="hero-content text-center">
					<div className="max-w-md">
						<h1 className="text-5xl font-bold">Hello there</h1>
						<p>
							Welcome to the admin panel where everyone can contribute to the website.
						</p>
						<ol className="list-decimal ms-8">
							<li>Visit the pages section from the left side drawer</li>
							<li>Add a new page and select the proper related data</li>
							<li>Wait for the page to be approved by an admin</li>
						</ol>
						<p>Thank you for your contribution!</p>
					</div>
				</div>
			</div>

			<div className="flex flex-row mb-10">
				<div className="form-control">
					<label className="label">
						<span className="label-text">Email</span>
					</label>
					<input type="text" placeholder="email" className="input input-bordered" value={token} onChange={setToken} />
				</div>
				<div className="form-control mt-9">
					<button className="btn btn-primary">Login (ADMIN ACCOUNTS ONLY)</button>
				</div>
			</div>
		</div>
	)
}
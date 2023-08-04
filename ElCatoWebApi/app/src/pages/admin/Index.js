import React from "react";
import { UserContext } from "../../App";
import CustomLink from "../../components/CustomLink";

export default function Index() {

	const { token, setToken } = React.useContext(UserContext);

	return (
		<div className="tajawal flex flex-col md:flex-row w-full mt-20">
			<div className="hero">
				<div className="text-center">
					<div className="max-w-md">
						<h1 className="text-5xl font-bold">Hello World!</h1>
						<p className="py-6">
							مرحبا في لوحة التحكم حيث تستطيع انشاء المحتوى واستعراض ادائه
						</p>
						<ol className="list-inside list-decimal mb-6" dir="rtl">
							<li>
								انتقل للوحة تحكم Pages عن طريق الزر بالأسفل
							</li>
							<li>
								املأ الحقول المطلوبة واضغط على زر Create
							</li>
							<li>
								انتظر حتى يتم مراجعة المحتوى ونشره من قبل المشرف
							</li>
							<li>
								ارجع للوحة التحكم لعرض اداء الصفحات التي قمت بإنشائها
							</li>
						</ol>
						<CustomLink className="btn btn-primary btn-block" to="/admin/pages">ابدأ</CustomLink>
					</div>
				</div>
			</div>
			<div className="divider divider-vertical md:divider-horizontal before:bg-base-content after:bg-base-content"></div>
			<div className="">
				<div className="form-control">
					<label className="label">
						<span className="label-text">Do you have an admin account?</span>
					</label>
					<input type="text" placeholder="email" className="input input-bordered" value={token} onChange={setToken} />
				</div>
				<div className="form-control my-2">
					<button className="btn btn-primary">Login</button>
				</div>
			</div>
		</div>
	)
}
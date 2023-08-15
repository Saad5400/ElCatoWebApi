import { useEffect, useState } from "react";
import Container from "../../components/Container";
import Dimmer from "../../components/Dimmer";
import { api } from "../../App"

export default function TablesGenerator(props) {

    const emptyOption = {
        group: null,
        // teacher: null,
        dayPeriods: [
            null,
        ]
    };
    const emptyCourse = {
        name: null,
        // type: null,
        options: [
            emptyOption,
        ],
    }
    const [courses, setCourses] = useState([
        emptyCourse,
    ]);
    const [tables, setTables] = useState([]);

    useEffect(() => {
        // console.log(courses[0].options[0].dayPeriods);
        // console.log(tables);
    }, [tables]);

    function submit(e) {
        e.preventDefault();
        // disable the button
        let button = e.target;
        button.disabled = true;

        api.post("/tables", courses).then((res) => {
            // console.log(res.data);
            handleTable(res.data);
        }).catch((err) => {
            console.log(err);
        });

        setTimeout(() => {
            button.disabled = false;
        }, 100);
    }

    const zeroPad = (num) => String(num).padStart(2, '0')

    function handleTable(tables) {
        console.log(tables);
        const tableElements = tables.map((table, tableIndex) => (
            <>
                <h1 className="w-full flex flex-row items-center justify-center bg-base-300 mt-3">
                    جدول رقم {tableIndex + 1}
                </h1>
                <table className="table table-compact table-zebra table-vcenter studyTable" dir="rtl" key={table.id}>
                    <thead>
                        <tr>
                            <th>الفترة</th>
                            <th>الأحد</th>
                            <th>الاثنين</th>
                            <th>الثلاثاء</th>
                            <th>الأربعاء</th>
                            <th>الخميس</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(10)].map((_, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{table.courses[`01${zeroPad(i + 1)}`] ? table.courses[`01${zeroPad(i + 1)}`].course.name + ' ش' + table.courses[`01${zeroPad(i + 1)}`].group : null}</td>
                                <td>{table.courses[`02${zeroPad(i + 1)}`] ? table.courses[`02${zeroPad(i + 1)}`].course.name + ' ش' + table.courses[`02${zeroPad(i + 1)}`].group : null}</td>
                                <td>{table.courses[`03${zeroPad(i + 1)}`] ? table.courses[`03${zeroPad(i + 1)}`].course.name + ' ش' + table.courses[`03${zeroPad(i + 1)}`].group : null}</td>
                                <td>{table.courses[`04${zeroPad(i + 1)}`] ? table.courses[`04${zeroPad(i + 1)}`].course.name + ' ش' + table.courses[`04${zeroPad(i + 1)}`].group : null}</td>
                                <td>{table.courses[`05${zeroPad(i + 1)}`] ? table.courses[`05${zeroPad(i + 1)}`].course.name + ' ش' + table.courses[`05${zeroPad(i + 1)}`].group : null}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        ));
        setTables(tableElements);
    }

    return (
        <Dimmer className="text-base-content flex flex-col justify-center items-center tajawal">
            <Container>
                <h1 className="text-2xl">
                    اداة توليد الجداول
                </h1>
                <br />
                <ol className="list-decimal list-inside" dir="rtl">
                    <li>
                        ادخل موقع الجامعة - البوابة الاكاديمية - المقررات المطروحة
                    </li>
                    <li>
                        اختر المقررات المرغوب تضمينها في الجداول وادخلها في الاداة
                    </li>
                    <li>
                        اضغط على زر توليد الجداول وستظهر جميع الجداول الممكنة
                    </li>
                </ol>
                <br />
                <h1 className="text-xl">
                    ملاحظة
                </h1>
                <br />
                <p dir="rtl">
                    الفترات عبارة عن رقمين الاول يمثل اليوم والثاني يمثل الفترة
                    <br />
                    مثلا 0105 تعني الاحد الفترة الخامسة
                    <br />
                    اما 0203,0204 تعني الاثنين الفترة الثالثة والرابعة
                    <br />
                    اما 0301,0302,0401,0402 تعني الثلاثاء الفترة الاولى والثانية والاربعاء الفترة الاولى والثانية
                </p>
                <p>
                    في حال وجود اكثر من نشاط للمادة مثل النظري والعملي
                    <br />
                    قم باضافة المقرر مرتين وغير اسمهما ليكونا مختلفين
                </p>
                <br />
                <div className="w-full flex flex-col gap-2" dir="rtl">
                    {courses.map((course, index) => {
                        return (
                            <div key={index} className=" flex flex-row w-full">
                                <button className="indicator-item indicator-middle badge badge-error text-white" onClick={() => {
                                    let newCourses = [...courses];
                                    newCourses = newCourses.filter((_, i) => i != index);
                                    setCourses(newCourses);
                                }}>
                                    X
                                </button>
                                <div key={index} className="join w-full flex flex-row flex-wrap border-base-content border-[1px]">
                                    <input name={`courseName${index}`} className="input input-bordered join-item w-full" placeholder="اسم المقرر" value={course.name} onChange={(e) => {
                                        let newCourses = [...courses];
                                        newCourses[index].name = e.target.value;
                                        setCourses(newCourses);
                                    }} />
                                    {course.options.map((option, optionIndex) => {
                                        return (
                                            <div key={optionIndex} className="flex flex-row w-full">
                                                <button className="indicator-item indicator-middle badge badge-error text-white" onClick={() => {
                                                    let newCourses = [...courses];
                                                    newCourses[index].options = newCourses[index].options.filter((_, i) => i != optionIndex);
                                                    setCourses(newCourses);
                                                }}>
                                                    X
                                                </button>
                                                <div key={optionIndex} className="flex flex-row w-full">
                                                    <input name={`groupNumber${optionIndex}`} className="input input-bordered w-full" placeholder="الشعبة" value={option.group} onChange={(e) => {
                                                        let newCourses = [...courses];
                                                        newCourses[index].options[optionIndex].group = e.target.value;
                                                        setCourses(newCourses);
                                                    }} />
                                                    {/* <input name={`teacherName${optionIndex}`} className="input input-bordered w-full" placeholder="اسم المدرس" value={option.teacher} onChange={(e) => {
                                                        let newCourses = [...courses];
                                                        newCourses[index].options[optionIndex].teacher = e.target.value;
                                                        setCourses(newCourses);
                                                    }} /> */}
                                                    <input name={`periods${optionIndex}`} className="input input-bordered w-full" placeholder="الفترات" value={option.dayPeriods.join(",")} onChange={(e) => {
                                                        let newCourses = [...courses];
                                                        newCourses[index].options[optionIndex].dayPeriods = e.target.value.split(",");
                                                        setCourses(newCourses);
                                                    }} />
                                                </div>
                                            </div>
                                        )
                                    })}
                                    <button className="btn btn-primary btn-block" onClick={() => {
                                        let newOption = emptyOption;
                                        newOption.dayPeriods = [null];
                                        let newCourses = [...courses];
                                        newCourses[index].options = [...newCourses[index].options, newOption];
                                        setCourses(newCourses);
                                    }}>اضافة شعبة</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <br />
                <div className="w-full flex flex-col gap-2">
                    <button className="btn btn-primary btn-block" onClick={() => {
                        setCourses([...courses, emptyCourse]);
                    }}>اضافة مقرر</button>
                    <button className="btn btn-primary btn-block" onClick={submit}
                    >توليد الجداول</button>
                </div>
                <br />
                <div className="w-full">
                    {/* // table data example:
                        /** 0101 = Sunday, 1st period, 0102 = Sunday, 2nd period, 0303 = Tuesday, 3rd period
                         {
                            courses: {
                                "0101" : { // Sunday, 1st period
                                    group: "1",
                                    teacher: "Ahmed",
                                    course: {
                                        name: "Math",
                                    }
                                }
                            }
                         }
                         */}
                    {tables}
                </div>
            </Container>
        </Dimmer>
    );
}
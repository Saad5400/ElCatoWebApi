import { useEffect, useState } from "react";
import Container from "../../components/Container";
import Dimmer from "../../components/Dimmer";
import { api } from "../../App"
import Alert from "../../components/Alert";

function Remove() {
    return (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 m-0 p-0">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>);
}

export default function TablesGenerator(props) {

    const emptyOption = {
        group: null,
        // teacher: null,
        dayPeriods: [
            null
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
    const [alert, setAlert] = useState(null);

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
            setAlert(<Alert className="alert-success">
                New table generated successfully
            </Alert>);
        }).catch((err) => {
            console.log(err);
            setAlert(<Alert className="alert-error">
            {JSON.stringify(err.response.data)}
        </Alert>);
        });

        setTimeout(() => {
            button.disabled = false;
        }, 100);
        setTimeout(() => {
            setAlert(null);
        }, 5000);
    }

    const zeroPad = (num) => String(num).padStart(2, '0')

    function getCourseInfo(course) {
        if (!course) return null;
        return (
            <>
                <span className="badge badge-primary">{course.course.name}</span>
                <span className="badge badge-secondary">ش{course.group}</span>
                <span className="badge badge-secondary">{course.teacher}</span>
            </>
        );
    }

    function handleTable(tables) {
        const tableElements = tables.map((table, tableIndex) => (
            <>
                <h1 className="w-full flex flex-row items-center justify-center bg-base-300 mt-3">
                    جدول رقم: {tableIndex + 1} | ايام اوف: {table.daysOff} | ساعات فراغ: {table.hoursOff}
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
                        {[...Array(12)].map((_, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                {/* <td>{table.courses[`01${zeroPad(i + 1)}`] ? table.courses[`01${zeroPad(i + 1)}`].course.name + ' ش' + table.courses[`01${zeroPad(i + 1)}`].group + ' [' + table.courses[`01${zeroPad(i + 1)}`].teacher + ']' : null}</td>
                                <td>{table.courses[`02${zeroPad(i + 1)}`] ? table.courses[`02${zeroPad(i + 1)}`].course.name + ' ش' + table.courses[`02${zeroPad(i + 1)}`].group + ' [' + table.courses[`02${zeroPad(i + 1)}`].teacher + ']' : null}</td>
                                <td>{table.courses[`03${zeroPad(i + 1)}`] ? table.courses[`03${zeroPad(i + 1)}`].course.name + ' ش' + table.courses[`03${zeroPad(i + 1)}`].group + ' [' + table.courses[`03${zeroPad(i + 1)}`].teacher + ']' : null}</td>
                                <td>{table.courses[`04${zeroPad(i + 1)}`] ? table.courses[`04${zeroPad(i + 1)}`].course.name + ' ش' + table.courses[`04${zeroPad(i + 1)}`].group + ' [' + table.courses[`04${zeroPad(i + 1)}`].teacher + ']' : null}</td>
                                <td>{table.courses[`05${zeroPad(i + 1)}`] ? table.courses[`05${zeroPad(i + 1)}`].course.name + ' ش' + table.courses[`05${zeroPad(i + 1)}`].group + ' [' + table.courses[`05${zeroPad(i + 1)}`].teacher + ']' : null}</td> */}
                                <td>
                                    {getCourseInfo(table.courses[`01${zeroPad(i + 1)}`])}
                                </td>
                                <td>
                                    {getCourseInfo(table.courses[`02${zeroPad(i + 1)}`])}
                                </td>
                                <td>
                                    {getCourseInfo(table.courses[`03${zeroPad(i + 1)}`])}
                                </td>
                                <td>
                                    {getCourseInfo(table.courses[`04${zeroPad(i + 1)}`])}
                                </td>
                                <td>
                                    {getCourseInfo(table.courses[`05${zeroPad(i + 1)}`])}
                                </td>
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
            {alert}
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
                            <div key={index} className="indicator flex flex-row w-full">
                                <button className="indicator-item badge badge-error text-white p-[2px]" onClick={() => {
                                    let newCourses = [...courses];
                                    newCourses = newCourses.filter((_, i) => i != index);
                                    setCourses(newCourses);
                                }}>
                                    <Remove />
                                </button>
                                <div key={index} className="join w-full flex flex-row flex-wrap border-base-content border-[1px]">
                                    <input type="text" required name={`courseName${index}`} className="input input-bordered join-item w-full" placeholder="اسم المقرر*" value={course.name} onChange={(e) => {
                                        let newCourses = [...courses];
                                        newCourses[index].name = e.target.value;
                                        setCourses(newCourses);
                                    }} />
                                    {course.options.map((option, optionIndex) => {
                                        return (
                                            <div key={optionIndex} className="indicator flex flex-row w-full">
                                                <button className="indicator-item indicator-end badge badge-error text-white p-[2px]" onClick={() => {
                                                    let newCourses = [...courses];
                                                    newCourses[index].options = newCourses[index].options.filter((_, i) => i != optionIndex);
                                                    setCourses(newCourses);
                                                }}>
                                                    <Remove />
                                                </button>
                                                <div key={optionIndex} className="flex flex-row w-full">
                                                    <input type="number" required name={`groupNumber${optionIndex}`} className="input input-bordered w-full" placeholder="الشعبة*" value={option.group} onChange={(e) => {
                                                        let newCourses = [...courses];
                                                        newCourses[index].options[optionIndex].group = e.target.value;
                                                        setCourses(newCourses);
                                                    }} />
                                                    <input name={`teacherName${optionIndex}`} className="input input-bordered w-full" placeholder="الدكتور" value={option.teacher} onChange={(e) => {
                                                        let newCourses = [...courses];
                                                        newCourses[index].options[optionIndex].teacher = e.target.value;
                                                        setCourses(newCourses);
                                                    }} />
                                                    {/* <input name={`periods${optionIndex}`} className="input input-bordered w-full" placeholder="الفترات" value={option.dayPeriods.join(",")} onChange={(e) => {
                                                        let newCourses = [...courses];
                                                        newCourses[index].options[optionIndex].dayPeriods = e.target.value.split(",");
                                                        setCourses(newCourses);
                                                    }} /> */}
                                                    <div>
                                                        {option.dayPeriods.map((dayPeriod, dayPeriodIndex) => {
                                                            return (
                                                                <div key={dayPeriodIndex} className="indicator flex flex-row w-full">
                                                                    <select className="select select-bordered p-1 pe-8" data-course={index} data-option={optionIndex} data-day-period={dayPeriodIndex} onChange={e => {
                                                                        let newCourses = [...courses];
                                                                        const newValue = e.target.value + (newCourses[index].options[optionIndex].dayPeriods[dayPeriodIndex] ? newCourses[index].options[optionIndex].dayPeriods[dayPeriodIndex].slice(-2) : "");
                                                                        console.log(newValue);
                                                                        newCourses[index].options[optionIndex].dayPeriods[dayPeriodIndex] = newValue;
                                                                        setCourses(newCourses);
                                                                    }}
                                                                    >
                                                                        <option selected disabled>اليوم</option>
                                                                        <option value="01">الاحد</option>
                                                                        <option value="02">الاثنين</option>
                                                                        <option value="03">الثلاثاء</option>
                                                                        <option value="04">الاربعاء</option>
                                                                        <option value="05">الخميس</option>
                                                                    </select>
                                                                    <select className="select select-bordered p-1 pe-8" data-course={index} data-option={optionIndex} data-day-period={dayPeriodIndex} onChange={e => {
                                                                        let newCourses = [...courses];
                                                                        const newValue = (newCourses[index].options[optionIndex].dayPeriods[dayPeriodIndex] ? newCourses[index].options[optionIndex].dayPeriods[dayPeriodIndex].slice(0, 2) : "" ) + e.target.value;
                                                                        console.log(newValue);
                                                                        newCourses[index].options[optionIndex].dayPeriods[dayPeriodIndex] = newValue;
                                                                        setCourses(newCourses);
                                                                    }}
                                                                    >
                                                                        <option selected disabled>الفترة</option>
                                                                        <option value="01">الفترة الاولى</option>
                                                                        <option value="02">الفترة الثانية</option>
                                                                        <option value="03">الفترة الثالثة</option>
                                                                        <option value="04">الفترة الرابعة</option>
                                                                        <option value="05">الفترة الخامسة</option>
                                                                        <option value="06">الفترة السادسة</option>
                                                                        <option value="07">الفترة السابعة</option>
                                                                        <option value="08">الفترة الثامنة</option>
                                                                        <option value="09">الفترة التاسعة</option>
                                                                        <option value="10">الفترة العاشرة</option>
                                                                        <option value="11">الفترة الحادية عشرة</option>
                                                                        <option value="12">الفترة الثانية عشرة</option>
                                                                    </select>
                                                                    <button className="indicator-item indicator-start badge badge-error text-white p-[2px]" onClick={(e) => {
                                                                        e.preventDefault();
                                                                        let newCourses = [...courses];
                                                                        newCourses[index].options[optionIndex].dayPeriods = newCourses[index].options[optionIndex].dayPeriods.filter((_, i) => i != dayPeriodIndex);
                                                                        setCourses(newCourses);
                                                                    }}>
                                                                        <Remove />
                                                                    </button>
                                                                </div>
                                                            )
                                                        })}

                                                        <button className="btn btn-primary btn-block mb-5" onClick={(e) => {
                                                            e.preventDefault();
                                                            let newCourses = [...courses];
                                                            newCourses[index].options[optionIndex].dayPeriods = [...newCourses[index].options[optionIndex].dayPeriods, null];
                                                            setCourses(newCourses);
                                                        }}>
                                                            اضافة فترة
                                                        </button>
                                                    </div>
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
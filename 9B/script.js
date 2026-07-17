// ===========================================
// Student Data
// ===========================================

const students = [
    { roll: 1, name: "Aadiya Dasandi", gender: "Boy" },
    { roll: 2, name: "Adrita Karmakar", gender: "Girl" },
    { roll: 3, name: "Amarjeet Dey", gender: "Boy" },
    { roll: 4, name: "Amrita Gorain", gender: "Girl" },
    { roll: 5, name: "Aniket Bauri", gender: "Boy" },
    { roll: 6, name: "Anirban Saren", gender: "Boy" },
    { roll: 7, name: "Ankit Gorai", gender: "Boy" },
    { roll: 8, name: "Ankita Pramanik", gender: "Girl" },
    { roll: 9, name: "Ankita Sengupta", gender: "Girl" },
    { roll: 10, name: "Anushka Mukherjee", gender: "Girl" },
    { roll: 11, name: "Anuska Shaw", gender: "Girl" },
    { roll: 12, name: "Arijit Karmakar", gender: "Boy" },
    { roll: 13, name: "Arnab Chakraborty", gender: "Boy" },
    { roll: 14, name: "Arnab Chatterjee", gender: "Boy" },
    { roll: 15, name: "Arnab Kalindi", gender: "Boy" },
    { roll: 16, name: "Arpa Karmakar", gender: "Boy" },
    { roll: 17, name: "Awanish Kumar Tiwari", gender: "Boy" },
    { roll: 18, name: "Ayan Ansary", gender: "Boy" },
    { roll: 19, name: "Dipannita Roy", gender: "Girl" },
    { roll: 20, name: "Dipen Das", gender: "Boy" },
    { roll: 21, name: "Falak Naz", gender: "Girl" },
    { roll: 22, name: "Fariya Khanam", gender: "Girl" },
    { roll: 23, name: "Himanshu Raj", gender: "Boy" },
    { roll: 24, name: "Md. Anas", gender: "Boy" },
    { roll: 25, name: "Om Yadav", gender: "Boy" },
    { roll: 26, name: "Oshmi Banerjee", gender: "Girl" },
    { roll: 27, name: "Palak Mishra", gender: "Girl" },
    { roll: 28, name: "Pallab Mukherjee", gender: "Boy" },
    { roll: 29, name: "Rajdeep Mandal", gender: "Boy" },
    { roll: 30, name: "Reshab Bouri", gender: "Boy" },
    { roll: 31, name: "Saswati Priyadarshani Jena", gender: "Girl" },
    { roll: 32, name: "Shreshtha Pandey", gender: "Girl" },
    { roll: 33, name: "Shreyan Sahu", gender: "Boy" },
    { roll: 34, name: "Shubham Kumar", gender: "Boy" },
    { roll: 35, name: "Shuvoshree Paul", gender: "Girl" },
    { roll: 36, name: "Sonu Kumar Sahu", gender: "Boy" },
    { roll: 37, name: "Soumyadeep Haldar", gender: "Boy" },
    { roll: 38, name: "Soumyarup Ray", gender: "Boy" },
    { roll: 39, name: "Suparna Gorain", gender: "Girl" },
    { roll: 40, name: "Supriya Sutradhar", gender: "Girl" },
    { roll: 41, name: "T. Sai Ganesh", gender: "Boy" },
    { roll: 42, name: "Tanusiya Shill", gender: "Girl" },
    { roll: 43, name: "Utkarsh Kumar Shaw", gender: "Boy" },
    { roll: 44, name: "Chetan Anand", gender: "Boy" },
    { roll: 45, name: "Prince Baruah", gender: "Boy" }
];

const absentStudents = new Set();

const dateTime = document.getElementById("dateTime");

function updateDateTime(){

    const now = new Date();

    const options = {

        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric"

    };

    const date =
        now.toLocaleDateString("en-IN",options);

    const time =
        now.toLocaleTimeString("en-IN");

    dateTime.innerHTML =
        `📅 ${date} | 🕒 ${time}`;

}

updateDateTime();

setInterval(updateDateTime,1000);

const toast =
document.getElementById("toast");

function showToast(message){

    toast.textContent=message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}

// ===========================================
// DOM Elements
// ===========================================

const studentList = document.getElementById("studentList");
const searchInput = document.getElementById("searchInput");

const totalStudents = document.getElementById("totalStudents");
const presentCount = document.getElementById("presentCount");
const absentCount = document.getElementById("absentCount");
const boysPresent = document.getElementById("boysPresent");
const girlsPresent = document.getElementById("girlsPresent");

const resultBox = document.getElementById("resultBox");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const selectAllBtn = document.getElementById("selectAllBtn");
const clearAllBtn = document.getElementById("clearAllBtn");

// ===========================================
// Display Students
// ===========================================

function displayStudents(studentArray){

    studentList.innerHTML = "";

    studentArray.forEach(student => {

        const item = document.createElement("div");
        item.className = "student-item";

        if (absentStudents.has(student.roll)) {
            item.classList.add("absent");
}

        item.innerHTML = `
            <input
                type="checkbox"
                id="student${student.roll}"
                class="studentCheckbox"
                data-roll="${student.roll}"
                ${absentStudents.has(student.roll) ? "checked" : ""}
            />

            <label for="student${student.roll}">
                ${student.roll}. ${student.name}
            </label>
        `;  

        studentList.appendChild(item);

    });

    updateCounts();

}

displayStudents(students);

// ===========================================
// Update Present / Absent Counts
// ===========================================

function updateCounts() {

    const total = students.length;
    const absent = absentStudents.size;
    const present = total - absent;

    const boysPresentCount = students.filter(student =>
        student.gender === "Boy" &&
        !absentStudents.has(student.roll)
    ).length;

    const girlsPresentCount = students.filter(student =>
        student.gender === "Girl" &&
        !absentStudents.has(student.roll)
    ).length;

    totalStudents.textContent = total;
    presentCount.textContent = present;
    absentCount.textContent = absent;

    boysPresent.textContent = boysPresentCount;
    girlsPresent.textContent = girlsPresentCount;
}

function setAbsent(roll, isAbsent) {

    // Find the student row
    const checkbox = document.querySelector(
        `.studentCheckbox[data-roll="${roll}"]`
    );

    const studentItem = checkbox?.closest(".student-item");

    if (isAbsent) {
        absentStudents.add(roll);

        if (checkbox)
            checkbox.checked = true;

        if (studentItem)
            studentItem.classList.add("absent");
    }
    else {

        absentStudents.delete(roll);

        if (checkbox)
            checkbox.checked = false;

        if (studentItem)
            studentItem.classList.remove("absent");
    }

    updateCounts();
}

document.addEventListener("change", function (e) {

    if (!e.target.classList.contains("studentCheckbox")) return;

    const roll = Number(e.target.dataset.roll);

    setAbsent(roll, e.target.checked);

});

// ===========================================
// Search Student
// ===========================================

searchInput.addEventListener("input",function(){

    const keyword = this.value.toLowerCase();

    const filtered = students.filter(student =>

        student.name.toLowerCase().includes(keyword) ||
        student.roll.toString().includes(keyword)

    );

    displayStudents(filtered);

});

const absentList =
students.filter(student =>
    absentStudents.has(student.roll)
);

// ===========================================
// Generate Absentee List
// ===========================================

generateBtn.addEventListener("click",function(){

    const checkboxes =
        document.querySelectorAll(".studentCheckbox");

    const today = new Date();

    const date =
        String(today.getDate()).padStart(2,'0') + "/" +
        String(today.getMonth()+1).padStart(2,'0') + "/" +
        today.getFullYear();

    let output =
`9B Today's Absentees 
(${date})

`;

    let count = 1;

    checkboxes.forEach((checkbox,index)=>{

        if(checkbox.checked){

            output += `${count}. ${students[index].name}\n`;
            count++;

        }

    });

    if(count===1){

        output += "No student is absent today.";

    }

    resultBox.value = output;

});

// ===========================================
// Copy Button
// ===========================================

copyBtn.addEventListener("click",function(){

    if(resultBox.value===""){
        alert("Generate the list first.");
        return;
    }

    navigator.clipboard.writeText(resultBox.value);

    copyBtn.textContent = "Copied ✓";

    showToast("✅ Attendance copied successfully!");

    setTimeout(function(){

        copyBtn.textContent = "Copy";

    },2000);

});

// ===========================================
// Select All
// ===========================================

selectAllBtn.addEventListener("click", function () {

    students.forEach(student => {

        setAbsent(student.roll, true);

    });

});

// ===========================================
// Clear All
// ===========================================

clearAllBtn.addEventListener("click", function () {

    students.forEach(student => {

        setAbsent(student.roll, false);

    });

});
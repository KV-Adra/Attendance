// ===========================================
// Student Data
// ===========================================

const students = [
  { "roll": 1, "name": "Aditi Digar" },
  { "roll": 2, "name": "Aditi Raj" },
  { "roll": 3, "name": "Aishee Mistri" },
  { "roll": 4, "name": "Anannya Mahato" },
  { "roll": 5, "name": "Angshuman Bauri" },
  { "roll": 6, "name": "Anjali Surin" },
  { "roll": 7, "name": "Ankita Mahajan" },
  { "roll": 8, "name": "Antara Chakraborty" },
  { "roll": 9, "name": "Anubhab Mishra" },
  { "roll": 10, "name": "Arka Karmakar" },
  { "roll": 11, "name": "Barsha Singh Sardar" },
  { "roll": 12, "name": "Bishal Pandey" },
  { "roll": 13, "name": "Debayan Ash" },
  { "roll": 14, "name": "Devapriya Biju" },
  { "roll": 15, "name": "Dhruvojyoti Das" },
  { "roll": 16, "name": "Ishant Singh" },
  { "roll": 17, "name": "Isha Soy" },
  { "roll": 18, "name": "Joyashri Nandi" },
  { "roll": 19, "name": "Megha Hansda" },
  { "roll": 20, "name": "Mohit Kumar" },
  { "roll": 21, "name": "Om Sharma" },
  { "roll": 22, "name": "Pragati Kumari" },
  { "roll": 23, "name": "Preetam Mandal" },
  { "roll": 24, "name": "Prity Mahato" },
  { "roll": 25, "name": "Purba Chakraborty" },
  { "roll": 26, "name": "Rajdeep Kar" },
  { "roll": 27, "name": "Rohan Roy" },
  { "roll": 28, "name": "Ronit Gorai" },
  { "roll": 29, "name": "Rudrika Rajak" },
  { "roll": 30, "name": "Samrat Banerjee" },
  { "roll": 31, "name": "Sartaj Ansary" },
  { "roll": 32, "name": "Saujanya Mahanty" },
  { "roll": 33, "name": "Shambhavi Anand" },
  { "roll": 34, "name": "Shibam Chatterjee" },
  { "roll": 35, "name": "Shivani Kumari" },
  { "roll": 36, "name": "Shruti Tiwari" },
  { "roll": 37, "name": "Subhajit Bouri" },
  { "roll": 38, "name": "Supriya Das" },
  { "roll": 39, "name": "Tejas Sharma" },
  { "roll": 40, "name": "Ashmeet Dubey" }
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
`9A Today's Absentees 
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

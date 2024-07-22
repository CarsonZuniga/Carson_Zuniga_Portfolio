import './Education.css'

const Education = () => {
    return (
        <div className="page_body">
            <h1>Education</h1>
            <div id="education_table">
                <div className="education_left">
                    <h2>2023</h2>
                </div>
                <div className="education_right">
                    <h2>BS in Computer Engineering</h2>
                    <h3>University of Illinois at Urbana-Champaign</h3>
                    <h4>GPA: 3.78</h4>
                    <div className="education_class_container">
                        <details>
                            <summary>ECE 385 - Digital Systems Laboratory</summary>
                                <ul>
                                    <li><strong>Course Overview:</strong> Focused on digital system design using FPGAs and VHDL/Verilog, emphasizing hands-on lab experience and practical applications.</li>
                                    <li><strong>Skills Acquired:</strong> Mastered FPGA programming, digital circuit design, and System on Chip (SoC) integration, using tools like Quartus and ModelSim.</li>
                                    <li><strong>Highlighted Project:</strong> Developed a complete SoC with a VGA controller on an FPGA, integrating custom peripherals and demonstrating real-time graphics processing.</li>
                                </ul>
                        </details>
                    </div>
                    <div className="education_class_container">
                        <details>
                            <summary>ECE 310 - Digital Signal Processing</summary>
                                <ul>
                                    <li><strong>Course Overview:</strong> Explored discrete-time systems, z-transforms, Fourier transforms, and digital filter design with practical applications in audio, communications, and medical imaging.</li>
                                    <li><strong>Skills Acquired:</strong> Developed proficiency in digital filter design, spectral analysis using FFT, and practical applications of DSP techniques.</li>
                                    <li><strong>Highlighted Project:</strong> Designed and implemented a digital filter for audio signal processing, demonstrating the ability to enhance signal quality and performance.</li>
                                </ul>
                        </details>
                    </div>
                    <div className="education_class_container">
                        <details>
                            <summary>ECE 391 - Computer Systems Engineering</summary>
                            <ul>
                                    <li><strong>Course Overview:</strong> Studied the design and implementation of operating systems, including process scheduling, memory management, and file systems.</li>
                                    <li><strong>Skills Acquired:</strong> Gained expertise in system programming, multi-threading, and kernel development using C and assembly language.</li>
                                    <li><strong>Highlighted Project:</strong> Implemented a multi-threaded operating system kernel, demonstrating proficiency in process management, memory allocation, and file system integration.</li>
                                </ul>
                        </details>
                    </div>
                    <div className="education_class_container">
                        <details>
                            <summary>ECE 448 - Artificial Intelligence</summary>
                                <ul>
                                    <li><strong>Course Overview:</strong> Studied AI fundamentals, including search algorithms, constraint satisfaction, machine learning, and neural networks.</li>
                                    <li><strong>Skills Acquired:</strong> Developed skills in AI problem-solving and machine learning using Python libraries such as NumPy, PyTorch, and TensorFlow.</li>
                                    <li><strong>Highlighted Project:</strong> Designed a chess engine using alpha-beta pruning and PyChess, showcasing advanced problem-solving and AI techniques.</li>
                                </ul>
                        </details>
                    </div>
                    <div className="education_class_container">
                        <details>
                            <summary>CS 411 - Database Systems</summary>
                                <ul>
                                    <li><strong>Course Overview:</strong> </li>
                                    <li><strong>Skills Acquired:</strong> </li>
                                    <li><strong>Highlighted Project:</strong> </li>
                                </ul>
                        </details>
                    </div>
                    <div className="education_class_container">
                        <details>
                            <summary>ECE 411 - Computer Organization & Design</summary>
                                <ul>
                                    <li><strong>Course Overview:</strong> </li>
                                    <li><strong>Skills Acquired:</strong> </li>
                                    <li><strong>Highlighted Project:</strong> </li>
                                </ul>
                        </details>
                    </div>
                    <div className="education_class_container">
                        <details>
                            <summary>ECE 428 - Distributed Systems</summary>
                                <ul>
                                    <li><strong>Course Overview:</strong> </li>
                                    <li><strong>Skills Acquired:</strong> </li>
                                    <li><strong>Highlighted Project:</strong> </li>
                                </ul>
                        </details>
                    </div>
                    <div className="education_class_container">
                        <details>
                            <summary>ECE 470 - Introduction to Robotics</summary>
                                <ul>
                                    <li><strong>Course Overview:</strong> </li>
                                    <li><strong>Skills Acquired:</strong> </li>
                                    <li><strong>Highlighted Project:</strong> </li>
                                </ul>
                        </details>
                    </div>
                </div>
            </div>
        </div>
    );
  };
  
  export default Education;
  
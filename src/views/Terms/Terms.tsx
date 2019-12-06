import * as React from "react";
import Footer from "../Home/Footer";
import "../About/styles.scss";
import "./styles.scss";
import Icon from "../../images/hp-terms-icon.svg"

const Terms = () => {
    return (
        <div className="container-blog">
            <div className="container-blog-c container">
                <br />
                <h3 className="faqtitle">HackPacking Terms of Service</h3>
                <br /><br /><br />
                <div className="item-question-t">
                    <img src={Icon} alt="imgicon"/>
                    <div>
                        <p style={{marginTop: 0}}>1. Terms</p>
                        <span>By accessing the website at http://www.hackpacking.life, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.</span>
                    </div>
                </div>
                <div className="item-question-t">
                    <img src={Icon} alt="imgicon"/>
                    <div>
                        <p style={{marginTop: 0}}>2. Use License</p>
                        <span>1. Permission is granted to temporarily download one copy of the materials (information or software) on HackPacking's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</span>
                        <ol>
                            <li><span>1. Modify or copy the materials;</span></li>
                            <li><span>2. Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</span></li>
                            <li><span>3. Attempt to decompile or reverse engineer any software contained on HackPacking's website;</span></li>
                            <li><span>4. Remove any copyright or other proprietary notations from the materials; or</span></li>
                            <li><span>5. Transfer the materials to another person or "mirror" the materials on any other server.</span></li>
                        </ol>
                        <span>2. This license shall automatically terminate if you violate any of these restrictions and may be terminated by HackPacking at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.</span>
                    </div>
                </div>
                <div className="item-question-t">
                    <img src={Icon} alt="imgicon"/>
                    <div>
                        <p style={{marginTop: 0}}>3. Disclaimer</p>
                        <span>1. The materials on HackPacking's website are provided on an 'as is' basis. HackPacking makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</span>
                        <span>2. Further, HackPacking does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.</span>
                    </div>
                </div>
                <div className="item-question-t">
                    <img src={Icon} alt="imgicon"/>
                    <div>
                        <p style={{marginTop: 0}}>4. Limitations</p>
                        <span>In no event shall HackPacking or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on HackPacking's website, even if HackPacking or a HackPacking authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</span>
                    </div>
                </div>
                <div className="item-question-t">
                    <img src={Icon} alt="imgicon"/>
                    <div>
                        <p style={{marginTop: 0}}>5. Accuracy of Materials</p>
                        <span>The materials appearing on HackPacking's website could include technical, typographical, or photographic errors. HackPacking does not warrant that any of the materials on its website are accurate, complete or current. HackPacking may make changes to the materials contained on its website at any time without notice. However HackPacking does not make any commitment to update the materials.</span>
                    </div>
                </div>
                <div className="item-question-t">
                    <img src={Icon} alt="imgicon"/>
                    <div>
                        <p style={{marginTop: 0}}>6. Links</p>
                        <span>HackPacking has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by HackPacking of the site. Use of any such linked website is at the user's own risk.</span>
                    </div>
                </div>
                <div className="item-question-t">
                    <img src={Icon} alt="imgicon"/>
                    <div>
                        <p style={{marginTop: 0}}>7. Modifications</p>
                        <span>HackPacking may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</span>
                    </div>
                </div>
                <div className="item-question-t">
                    <img src={Icon} alt="imgicon"/>
                    <div>
                        <p style={{marginTop: 0}}>8. Governing Law</p>
                        <span>These terms and conditions are governed by and construed in accordance with the laws of Lima, Peru and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</span>
                    </div>
                </div>
                
                <br /><br /><br />
            </div>
            <Footer />
        </div>
    )
}
export default Terms;
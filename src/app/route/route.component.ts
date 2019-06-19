import { Component, OnInit } from '@angular/core';
import { RouteDataService } from '../service/data/route-data.service';
import { Route, WayPoint } from '../enitities/route';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '../user/shared/user';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  routeId: String
  route: Route
  errorMessage: String;
  sumbited = false;
 // countries = ['Denmark', 'Sweden', 'Norway', 'Finland', 'Lithuania', 'Estonia', 'Latvia'];

  constructor(
    private routeDataService: RouteDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.routeId = this.activatedRoute.snapshot.params['id']
      this.route = new Route(this.routeId, "", new Location("", "", "", "", ""), new Date(), 0,0,"","released",undefined,100 ,0,0, false)
    if (this.routeId != 'newRoute') {
      this.routeDataService.retrieveRoute(localStorage.getItem('userId'), this.routeId).subscribe(
        data => {
          this.route = data
        console.log(data)},
        error => this.handleErrorResponse(error)
      )
    }

  }
  saveRoute() {
    this.sumbited = true;
    if (this.routeId === 'newRoute') {
      
      this.routeDataService.createRoute(localStorage.getItem('userId'), this.route).subscribe(
        data => {
          this.router.navigate(['myroutes'])
        },
        error => this.handleErrorResponse(error)
    )
    } else {
      this.routeDataService.updateRoute(this.routeId, this.route).subscribe(
        data => {
          this.router.navigate(['myroutes'])
        },
        error => this.handleErrorResponse(error)
      )
    }
  }
  removeWayPoint(index) {
    this.route.wayPoints.splice(index, 1)
  }
  addWayPoint() {
    var index = 1
    var wayPoint = new WayPoint(0, 0, index)
    if (this.route.wayPoints === undefined || this.route.wayPoints.length === 0 ) {
      var wayPoints: WayPoint[] = [wayPoint]
      this.route.wayPoints = wayPoints
    } else {
      wayPoint.index = this.route.wayPoints[this.route.wayPoints.length - 1].index + 1
      this.route.wayPoints.push(wayPoint)
    }
    console.log(this.route)
  }

  cancel() {
    this.router.navigate(['myroutes'])
  }

  handleErrorResponse(error) {
    if (error.error.message != null) {
      this.errorMessage = error.error.message;
    } else {
      this.errorMessage = "Error: Could not get connection to server";
    }
  }
  countries = [
    {
      "country": "Afghanistan"
    },
    {
      "country": "Albania"
    },
    {
      "country": "Algeria"
    },
    {
      "country": "American Samoa"
    },
    {
      "country": "Andorra"
    },
    {
      "country": "Angola"
    },
    {
      "country": "Anguilla"
    },
    {
      "country": "Antarctica"
    },
    {
      "country": "Antigua and Barbuda"
    },
    {
      "country": "Argentina"
    },
    {
      "country": "Armenia"
    },
    {
      "country": "Aruba"
    },
    {
      "country": "Australia"
    },
    {
      "country": "Austria"
    },
    {
      "country": "Azerbaijan"
    },
    {
      "country": "Bahamas"
    },
    {
      "country": "Bahrain"
    },
    {
      "country": "Bangladesh"
    },
    {
      "country": "Barbados"
    },
    {
      "country": "Belarus"
    },
    {
      "country": "Belgium"
    },
    {
      "country": "Belize"
    },
    {
      "country": "Benin"
    },
    {
      "country": "Bermuda"
    },
    {
      "country": "Bhutan"
    },
    {
      "country": "Bolivia"
    },
    {
      "country": "Bosnia and Herzegovina"
    },
    {
      "country": "Botswana"
    },
    {
      "country": "Bouvet Island"
    },
    {
      "country": "Brazil"
    },
    {
      "country": "British Indian Ocean Territory"
    },
    {
      "country": "Brunei"
    },
    {
      "country": "Bulgaria"
    },
    {
      "country": "Burkina Faso"
    },
    {
      "country": "Burundi"
    },
    {
      "country": "Cambodia"
    },
    {
      "country": "Cameroon"
    },
    {
      "country": "Canada"
    },
    {
      "country": "Cape Verde"
    },
    {
      "country": "Cayman Islands"
    },
    {
      "country": "Central African Republic"
    },
    {
      "country": "Chad"
    },
    {
      "country": "Chile"
    },
    {
      "country": "China"
    },
    {
      "country": "Christmas Island"
    },
    {
      "country": "Cocos (Keeling) Islands"
    },
    {
      "country": "Colombia"
    },
    {
      "country": "Comoros"
    },
    {
      "country": "Congo"
    },
    {
      "country": "The Democratic Republic of Congo"
    },
    {
      "country": "Cook Islands"
    },
    {
      "country": "Costa Rica"
    },
    {
      "country": "Ivory Coast"
    },
    {
      "country": "Croatia"
    },
    {
      "country": "Cuba"
    },
    {
      "country": "Cyprus"
    },
    {
      "country": "Czech Republic"
    },
    {
      "country": "Denmark"
    },
    {
      "country": "Djibouti"
    },
    {
      "country": "Dominica"
    },
    {
      "country": "Dominican Republic"
    },
    {
      "country": "East Timor"
    },
    {
      "country": "Ecuador"
    },
    {
      "country": "Egypt"
    },
    {
      "country": "England"
    },
    {
      "country": "El Salvador"
    },
    {
      "country": "Equatorial Guinea"
    },
    {
      "country": "Eritrea"
    },
    {
      "country": "Estonia"
    },
    {
      "country": "Ethiopia"
    },
    {
      "country": "Falkland Islands"
    },
    {
      "country": "Faroe Islands"
    },
    {
      "country": "Fiji Islands"
    },
    {
      "country": "Finland"
    },
    {
      "country": "France"
    },
    {
      "country": "French Guiana"
    },
    {
      "country": "French Polynesia"
    },
    {
      "country": "French Southern territories"
    },
    {
      "country": "Gabon"
    },
    {
      "country": "Gambia"
    },
    {
      "country": "Georgia"
    },
    {
      "country": "Germany"
    },
    {
      "country": "Ghana"
    },
    {
      "country": "Gibraltar"
    },
    {
      "country": "Greece"
    },
    {
      "country": "Greenland"
    },
    {
      "country": "Grenada"
    },
    {
      "country": "Guadeloupe"
    },
    {
      "country": "Guam"
    },
    {
      "country": "Guatemala"
    },
    {
      "country": "Guinea"
    },
    {
      "country": "Guinea-Bissau"
    },
    {
      "country": "Guyana"
    },
    {
      "country": "Haiti"
    },
    {
      "country": "Heard Island and McDonald Islands"
    },
    {
      "country": "Holy See (Vatican City State)"
    },
    {
      "country": "Honduras"
    },
    {
      "country": "Hong Kong"
    },
    {
      "country": "Hungary"
    },
    {
      "country": "Iceland"
    },
    {
      "country": "India"
    },
    {
      "country": "Indonesia"
    },
    {
      "country": "Iran"
    },
    {
      "country": "Iraq"
    },
    {
      "country": "Ireland"
    },
    {
      "country": "Israel"
    },
    {
      "country": "Italy"
    },
    {
      "country": "Jamaica"
    },
    {
      "country": "Japan"
    },
    {
      "country": "Jordan"
    },
    {
      "country": "Kazakhstan"
    },
    {
      "country": "Kenya"
    },
    {
      "country": "Kiribati"
    },
    {
      "country": "Kuwait"
    },
    {
      "country": "Kyrgyzstan"
    },
    {
      "country": "Laos"
    },
    {
      "country": "Latvia"
    },
    {
      "country": "Lebanon"
    },
    {
      "country": "Lesotho"
    },
    {
      "country": "Liberia"
    },
    {
      "country": "Libyan Arab Jamahiriya"
    },
    {
      "country": "Liechtenstein"
    },
    {
      "country": "Lithuania"
    },
    {
      "country": "Luxembourg"
    },
    {
      "country": "Macao"
    },
    {
      "country": "North Macedonia"
    },
    {
      "country": "Madagascar"
    },
    {
      "country": "Malawi"
    },
    {
      "country": "Malaysia"
    },
    {
      "country": "Maldives"
    },
    {
      "country": "Mali"
    },
    {
      "country": "Malta"
    },
    {
      "country": "Marshall Islands"
    },
    {
      "country": "Martinique"
    },
    {
      "country": "Mauritania"
    },
    {
      "country": "Mauritius"
    },
    {
      "country": "Mayotte"
    },
    {
      "country": "Mexico"
    },
    {
      "country": "Micronesia, Federated States of"
    },
    {
      "country": "Moldova"
    },
    {
      "country": "Monaco"
    },
    {
      "country": "Mongolia"
    },
    {
      "country": "Montserrat"
    },
    {
      "country": "Morocco"
    },
    {
      "country": "Mozambique"
    },
    {
      "country": "Myanmar"
    },
    {
      "country": "Namibia"
    },
    {
      "country": "Nauru"
    },
    {
      "country": "Nepal"
    },
    {
      "country": "Netherlands"
    },
    {
      "country": "Netherlands Antilles"
    },
    {
      "country": "New Caledonia"
    },
    {
      "country": "New Zealand"
    },
    {
      "country": "Nicaragua"
    },
    {
      "country": "Niger"
    },
    {
      "country": "Nigeria"
    },
    {
      "country": "Niue"
    },
    {
      "country": "Norfolk Island"
    },
    {
      "country": "North Korea"
    },
    {
      "country": "Northern Ireland"
    },
    {
      "country": "Northern Mariana Islands"
    },
    {
      "country": "Norway"
    },
    {
      "country": "Oman"
    },
    {
      "country": "Pakistan"
    },
    {
      "country": "Palau"
    },
    {
      "country": "Palestine"
    },
    {
      "country": "Panama"
    },
    {
      "country": "Papua New Guinea"
    },
    {
      "country": "Paraguay"
    },
    {
      "country": "Peru"
    },
    {
      "country": "Philippines"
    },
    {
      "country": "Pitcairn"
    },
    {
      "country": "Poland"
    },
    {
      "country": "Portugal"
    },
    {
      "country": "Puerto Rico"
    },
    {
      "country": "Qatar"
    },
    {
      "country": "Reunion"
    },
    {
      "country": "Romania"
    },
    {
      "country": "Russian Federation"
    },
    {
      "country": "Rwanda"
    },
    {
      "country": "Saint Helena"
    },
    {
      "country": "Saint Kitts and Nevis"
    },
    {
      "country": "Saint Lucia"
    },
    {
      "country": "Saint Pierre and Miquelon"
    },
    {
      "country": "Saint Vincent and the Grenadines"
    },
    {
      "country": "Samoa"
    },
    {
      "country": "San Marino"
    },
    {
      "country": "Sao Tome and Principe"
    },
    {
      "country": "Saudi Arabia"
    },
    {
      "country": "Scotland"
    },
    {
      "country": "Senegal"
    },
    {
      "country": "Seychelles"
    },
    {
      "country": "Sierra Leone"
    },
    {
      "country": "Singapore"
    },
    {
      "country": "Slovakia"
    },
    {
      "country": "Slovenia"
    },
    {
      "country": "Solomon Islands"
    },
    {
      "country": "Somalia"
    },
    {
      "country": "South Africa"
    },
    {
      "country": "South Georgia and the South Sandwich Islands"
    },
    {
      "country": "South Korea"
    },
    {
      "country": "South Sudan"
    },
    {
      "country": "Spain"
    },
    {
      "country": "SriLanka"
    },
    {
      "country": "Sudan"
    },
    {
      "country": "Suriname"
    },
    {
      "country": "Svalbard and Jan Mayen"
    },
    {
      "country": "Swaziland"
    },
    {
      "country": "Sweden"
    },
    {
      "country": "Switzerland"
    },
    {
      "country": "Syria"
    },
    {
      "country": "Tajikistan"
    },
    {
      "country": "Tanzania"
    },
    {
      "country": "Thailand"
    },
    {
      "country": "Togo"
    },
    {
      "country": "Tokelau"
    },
    {
      "country": "Tonga"
    },
    {
      "country": "Trinidad and Tobago"
    },
    {
      "country": "Tunisia"
    },
    {
      "country": "Turkey"
    },
    {
      "country": "Turkmenistan"
    },
    {
      "country": "Turks and Caicos Islands"
    },
    {
      "country": "Tuvalu"
    },
    {
      "country": "Uganda"
    },
    {
      "country": "Ukraine"
    },
    {
      "country": "United Arab Emirates"
    },
    {
      "country": "United Kingdom"
    },
    {
      "country": "United States"
    },
    {
      "country": "United States Minor Outlying Islands"
    },
    {
      "country": "Uruguay"
    },
    {
      "country": "Uzbekistan"
    },
    {
      "country": "Vanuatu"
    },
    {
      "country": "Venezuela"
    },
    {
      "country": "Vietnam"
    },
    {
      "country": "Virgin Islands, British"
    },
    {
      "country": "Virgin Islands, U.S."
    },
    {
      "country": "Wales"
    },
    {
      "country": "Wallis and Futuna"
    },
    {
      "country": "Western Sahara"
    },
    {
      "country": "Yemen"
    },
    {
      "country": "Yugoslavia"
    },
    {
      "country": "Zambia"
    },
    {
      "country": "Zimbabwe"
    }
  ]
}

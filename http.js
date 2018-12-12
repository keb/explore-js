module.exports = () => {
    /**
     * Hypertext Transfer Protocol
     * is an application protocol for distributed, collaborative, hypermedia information systems.
     * 
     * HTTP is the foundation of data comunication on the World Wide Web, where hypertext documents include
     * hyperlinks to other resources that the user can access
     * 
     * # Technical Overview
     * HTTP functions as a request-response protocol in teh client-server computing model.
     * A web browser may be a `client` and an application running on a computer hosting a website may be the `server`
     * 
     * The client submits an HTTP request message to the server. The server, which provides `resources` such as HTML files & other content,
     * or performs other functions on behalf of the client, returns a `response` message to the client.
     * The response contains completion status information about the request and may also contain requested content in its message body
     * 
     * A web browser is an example of a user agent (UA). Other types of user agents may be web crawlers, mobile apps, or software.
     * 
     * HTTP is designed to permit intermediate network elements to improve or enable communications between clients and servers.
     * High-traffic websites often benefit from the web cahce servers that deliver content on behalf of upstream servers to improve response times.
     * Web browsers cache previously accessed web resources and reuse them, when possible, to reduce network traffic.
     * 
     * HTTP is an application layer protocol designed within the framework of the Internet Protocol Suite (TCP/IP).
     * Its definition presumes an underlying and reliable transport layer protocol, and TCP is commonly used.
     * 
     * HTTP Resources are identifed and located on the network by Uniform Resource Locators (URLs), using Uniform Resource Identifiers (URIs)
     * schemes `http` and `https`. URIs and hyperlinks in HTML documents form interlinked hypertext documents.
     * 
     * HTTP/1.1 is a revision of HTTP/1.0 (the original). In 1.0 a separate connection to the same server is made for every resource request.
     * 1.1 can resuse a connection multiple times to dwonload images, scripts, stylesheets, etc, after the page has been delivered.
     */

    /**
     * HTTP Session
     * A sequence of network request-response transactions. An HTTP client initiates a request by establishing a TCP connection
     * to a particular port on a server (typically port 80, occassionally 8080)
     * An HTTP server listening on that port waits for a client's request message.
     * Upon receiving the request, the server sends back a status line, such as `HTTP/1.1 200 OK`, and a message of its own.
     * The body of this message is typically the requested resource, although an error message or other infromation may also be returned.
     */

    /**
     * HTTP authentication
     * HTTP provides multiple authentication schemes such as basic access authentication and digest access authentication
     * which operate via a challenge-response mechanism whereby the server identifies and issues a challenge before serving the requested content.
     * 
     * HTTP provides a general framework for access control and authentication, via an extensible set of challenge-response authentication schemes, which
     * can only be used by a server to challenge a client request and by a client to provide authentication information.
     * 
     * // Authentication realms
     * The HTTP Authentication sepcification also provides an arbitrary implementation-specific contrust for further dividing resources
     * common to a given root URI.
     * The realm value string, if present, is combined with the canonical root URI to form the protection space component of the challenge.
     * This in effect allows the server to define separate authentication scopes under one root URI.
     */

    /**
     * Request Methods
     * HTTP defines methods to indicate the desired action to be performed on the identified resource.
     * If a method is unknown to an intermediate, it will be treated as an unsafe and non-idempotent method.
     * There is no limit to the number of methods that can be defined and this allows for future methods to be specified without breaking existing infrastructure.
     * 
     * GET
     * The GET method requests a representation of the specified resource.
     * Requests using AGET should only retrieve data and should have no other effect
     * w3.org suggests to use GET if: "The interaction is more like a question (query, read operation, or lookup"
     * 
     * POST
     * The POST method requests that the server accept the entity enclosed in the request as a new subordinate of the web resource identified by the URI.
     * The data POSTed might be, for example, an annotation for existing resources; a message for a bulletin board, newsgroup
     * A block of data that is a result of submitting a web form, or item to add to database.
     * w3.org suggests to use POST if: "The interaction is more like an order or changes the state of the resource in a way the user may perceive"
     * or "The user be held accountable for the results of the interaction."
     * 
     * HEAD
     * The HEAD method asks for a response identical to that of a GET, but without the response body.
     * This is useful for retrieving meta-information written in response headers, without transporting the entire content
     * 
     * PUT
     * The PUT method requests that the enclosed entity be stored under the supplied URI.
     * If the URI referse to an already existing resource, it is modified
     * If the URI does not point to an existing resource, then the server can create the resource with that URI
     * 
     * DELETE
     * The DELETE method deletes the specified resource.
     * 
     * TRACE
     * The TRACE method echoes the received request so that a client can see what (if any) changes or additions have been made by intermediate servers
     * 
     * OPTIONS
     * The OPTIONS method returns the HTTP methods that the server supports for the specified URL.
     * This can be used to check the functionality of a web server by requesting '*' instead of a specific resource
     * 
     * CONNECT
     * The CONNECT method converts the request connection to a transparent TCP/IP tunnel, usually to facilitate SSL-encrypted communication (HTTPS)
     * through an unencrypted HTTP proxy.
     * 
     * PATCH
     * The PATCH method applies partial modifications to a resource
     * 
     * All general-purpose HTTP servers are required to implement at least GET and HEAD methods, all others are option by the specification.
     */

    /**
     * Safe Methods
     * HEAD, GET, OPTIONS, and TRACE are by convention defined as `safe`
     * This means they are intended only for information retrieval and should not change the state of the server.or ave side effects
     * (Beyond relatively harmless effects such as logging, caching)
     * 
     * By contrast, methods such as POST, PUT, DELETE, and PATCH are intended for actiosn that may cause side effects either on teh server, or external side effects
     * such as financial transactions or transmission of email.
     * Such methods are therefore not usually used by conforming web robots or crawlers.
     * 
     * Despite the prescribed safety of GET requests ,in practice, their handling by the server is no technically limited in any way.
     * Therefore, careless or deliberate programming can cause non-trivial changes on the server.
     * 
     * For example, a website might allow deletion of a resource through a URL such as http://example.com/article/1234/delete
     * which, if arbitrarily fetched even using GET, would delete the article
     */

    /**
     * Idempotent methods and web applications
     * PUT and DELETE are defined to be idempotent, meaning that multiple identical requests should have the same effect as a single request
     * Idempotence refers to the state of the system after the request has completed, so while the action the server takess or response code may be different,
     * the system state will be the same every time
     * 
     * Safe methods should be idempotent, as HTT Pis a stateless protocol, which means that each the receiver and sender is unaware
     * of the state of the other.
     * 
     * POST method is not necessarily idempotent, and therefore sending identical POST requests multiple times may further affect state.
     * In some cases, it may be desirable, but in other cases this could be due to an accident, such as when a user does not realize that their action
     * will result in sending anotehr request. It is generally up to the web application to handle cases where POST request should not be submitted
     * more than once.
     * 
     * Note that whether a method is idempotent is not enforced by the protocol or web server. It is perfectly possible to write a web application in which
     * a database insert or otehr non-idempotent action is triggered by a GET or other request.
     */

    /**
     * Security
     * The TRACe method can be used as part of a class of attacks known as cross-site tracing. For taht reason, common security
     * advice is for it to be disabled in the server configuration.
     */

    /**
     * Status Codes
     * The first line of the HTTP response is called the status line and includes a numeric status code and a textual reason phrase
     * such as "Not Found".
     * 
     * The way the user agent handles the response depends primarily on the code, and secondarily on the other response header fields.
     * Custom status codes can be used for if the user agent encounters a code it does not recognize, it can use the first digit of the code
     * to determine the general class of the response.;
     * * Informational 1XX
     * * Successful    2XX
     * * Redirection   3XX
     * * Client Error  4XX
     * * Server Error  5XX
     */

    /**
     * HTTP Session State
     * HTTP is a stateless protocol, and a stateless protocol does not require the HTTP server to retain information or status
     * about each user for teh duration of multiple requests.
     * However, some web applications implement states or server side sessions using HTTP cookies or hidden variables within web forms
     */

    /**
     * Encrypted connections
     * The most popular way of establishing an encrypted HTTP connection is HTTPS. Two other methods are STP, and HTTP/1.1 Upgrade header with TLS
     * 
     * With HTTPS, the communication protocol is encrypted using Transport Layer Security (TLS) or formerly, its predecessor, Secure Sockets Layer (SSL)
     * The principal motivation for HTTPS is the authentication of the accessed website and the protection of privacy & integrity of the exchanged
     * data while in transit.
     * 
     * It protects against man-in-the-middle attacks. The bidirection encryption of communications between client and server protects against eavesdropping or tampering.
     * Because HTTPS piggybacks HTTP entirely on top of TLS< the entire underlying HTTP protocol can be encrypted.
     * This includes request URLs, query parameters, headers, and cookies.
     * 
     * Web browsers know how to trust HTTPS websites based on certificate authorities that come pre-installed in their software. (such as Let's Encrypt)
     */

    /**
     * Message Format
     * The client and server communicate by sending plain-text (ASCII) messages. The client sends requests, the server sends responses.
     * 
     * Request Message
     * Consists of:
     * * A request line (GET /images/logo.png HTTP/1.1)
     * * request header fields (e.g. Accept-Language: en)
     * * an empty line
     * * an optional message body
     * 
     * Response Message
     * Consists of:
     * * A status line which includes the status code & reason message (e.g., HTTP/1.1 200 OK)
     * * response header fields (e.g. Content-Type: text/html)
     * * an empty line
     * * an optional message body
     */
};